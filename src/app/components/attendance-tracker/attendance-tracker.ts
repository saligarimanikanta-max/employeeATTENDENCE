import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeService, Employee } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './attendance-tracker.html',
  styleUrls: ['./attendance-tracker.scss']
})
export class AttendanceTrackerComponent {

  employees: Employee[] = [];

  attendance: any = {};

  displayedColumns: string[] = [
    'id',
    'name',
    'department',
    'attendance'
  ];

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {

    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });

    this.attendanceService.getAttendance().subscribe(data => {
      this.attendance = data;
    });

  }

  markAttendance(id: number, status: string) {
    this.attendanceService.markAttendance(id, status);
  }

}