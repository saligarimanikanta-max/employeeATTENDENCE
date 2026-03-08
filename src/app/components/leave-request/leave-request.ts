import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './leave-request.html',
  styleUrls: ['./leave-request.scss']
})
export class LeaveRequestComponent {

  leaveForm!: FormGroup;
  leaveRequests:any[] = [];

  displayedColumns:string[] = ['employee','start','end','reason','status'];

  constructor(
    private fb:FormBuilder,
    private leaveService:LeaveService
  ){}

  ngOnInit(){

    this.leaveForm = this.fb.group({
      employeeName:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      reason:['',Validators.required]
    });

    this.leaveService.getLeaves().subscribe(data=>{
      this.leaveRequests = data;
    });

  }

  submitLeave(){

    if(this.leaveForm.valid){

      const leave = {
        ...this.leaveForm.value,
        status:'Pending'
      };

      this.leaveService.addLeave(leave);

      this.leaveForm.reset();

    }

  }

}