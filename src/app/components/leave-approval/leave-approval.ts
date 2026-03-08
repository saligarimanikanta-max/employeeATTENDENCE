import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl:'./leave-approval.html',
  styleUrls:['./leave-approval.scss']
})
export class LeaveApprovalComponent {

  leaveRequests:any[] = [];

  displayedColumns:string[]=[
    'employee',
    'start',
    'end',
    'reason',
    'status',
    'action'
  ];

  constructor(private leaveService:LeaveService){}

  ngOnInit(){

    this.leaveService.getLeaves().subscribe(data=>{
      this.leaveRequests = data;
    });

  }

  approveLeave(leave:any){
    leave.status="Approved";
    this.leaveService.updateLeave();
  }

  rejectLeave(leave:any){
    leave.status="Rejected";
    this.leaveService.updateLeave();
  }

}