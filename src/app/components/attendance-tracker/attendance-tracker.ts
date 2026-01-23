import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EmployeeService, Employee } from '../../services/employee';
import { AttendanceService, Attendance } from '../../services/attendance';

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './attendance-tracker.html',
  styleUrls: ['./attendance-tracker.scss']
})
export class AttendanceTrackerComponent implements OnInit {

  displayedColumns: string[] = ['employee', 'date', 'status', 'actions'];

  employees: Employee[] = [];
  attendanceList: Attendance[] = [];

  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendance();
  }

  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (err: unknown) => {
        console.error('Error loading employees', err);
      }
    });
  }

  private loadAttendance(): void {
    this.attendanceService.getAttendance().subscribe({
      next: (data: Attendance[]) => {
        this.attendanceList = data;
      },
      error: (err: unknown) => {
        console.error('Error loading attendance', err);
      }
    });
  }

  markAttendance(
    emp: Employee,
    status: 'Present' | 'Absent' | 'Leave'
  ): void {
    const record: Attendance = {
      id: Date.now(),           // JSON Server friendly ID
      employeeId: emp.id,
      date: this.today,
      status
    };

    this.attendanceService.saveAttendance(record).subscribe({
      next: () => {
        this.snackBar.open('Attendance saved successfully', 'Close', {
          duration: 2000
        });
        this.loadAttendance();
      },
      error: (err: unknown) => {
        console.error('Error saving attendance', err);
      }
    });
  }
}
