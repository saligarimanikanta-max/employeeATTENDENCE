import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { EmployeeService, Employee } from '../../services/employee.service';
import { LeaveService, Leave } from '../../services/leave.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

  totalEmployees = 0;
  presentToday = 0;
  pendingLeaves = 0;
  approvedLeaves = 0;

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadLeaves();
  }

  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.totalEmployees = employees.length;
        this.presentToday = employees.filter(
          (emp: Employee) => emp.isActive
        ).length;
      },
      error: (err: unknown) => {
  console.error(err);
}

    });
  }

  private loadLeaves(): void {
    this.leaveService.getLeaves().subscribe({
      next: (leaves: Leave[]) => {
        this.pendingLeaves = leaves.filter(
          (leave: Leave) => leave.status === 'Pending'
        ).length;

        this.approvedLeaves = leaves.filter(
          (leave: Leave) => leave.status === 'Approved'
        ).length;
      },
      error: (err) => {
        console.error('Error loading leaves', err);
      }
    });
  }
}
