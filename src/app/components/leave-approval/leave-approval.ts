import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { LeaveService, Leave } from '../../services/leave';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './leave-approval.html',
  styleUrls: ['./leave-approval.scss']
})
export class LeaveApprovalComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'employeeId',
    'fromDate',
    'toDate',
    'reason',
    'status',
    'actions'
  ];

  leaves: Leave[] = [];

  constructor(
    private leaveService: LeaveService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leaveService.getLeaves().subscribe({
      next: (data: Leave[]) => {
        this.leaves = data;
      },
      error: (err: unknown) => {
        console.error(err);
      }
    });
  }

  approveLeave(leave: Leave): void {
    const updatedLeave: Leave = { ...leave, status: 'Approved' };

    this.leaveService.updateLeaveStatus(updatedLeave).subscribe({
      next: () => {
        this.snackBar.open('Leave approved', 'Close', { duration: 3000 });
        this.loadLeaves(); // 🔥 refresh data
      }
    });
  }

  rejectLeave(leave: Leave): void {
    const updatedLeave: Leave = { ...leave, status: 'Rejected' };

    this.leaveService.updateLeaveStatus(updatedLeave).subscribe({
      next: () => {
        this.snackBar.open('Leave rejected', 'Close', { duration: 3000 });
        this.loadLeaves(); // 🔥 refresh data
      }
    });
  }
}
