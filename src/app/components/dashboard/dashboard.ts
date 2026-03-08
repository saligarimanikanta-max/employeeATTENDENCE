import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { EmployeeService, Employee } from '../../services/employee.service';
import { LeaveService } from '../../services/leave.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {

  totalEmployees = 0;
  presentToday = 0;
  pendingLeaves = 0;
  approvedLeaves = 0;

  employees: Employee[] = [];
  attendance: any = {};

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {

    // Employee updates
    this.employeeService.getEmployees().subscribe(emp => {

      this.employees = emp;

      this.totalEmployees = emp.length;

      this.updatePresentCount();

    });

    // Attendance updates
    this.attendanceService.getAttendance().subscribe(data => {

      this.attendance = data;

      this.updatePresentCount();

    });

    // Leave updates
    this.leaveService.getLeaves().subscribe(leaves => {

      this.pendingLeaves = leaves.filter(l => l.status === 'Pending').length;

      this.approvedLeaves = leaves.filter(l => l.status === 'Approved').length;

    });

  }

  updatePresentCount() {

    this.presentToday = Object.values(this.attendance)
      .filter(status => status === 'Present').length;

  }

}