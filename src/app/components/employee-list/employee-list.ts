import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeListComponent {

  employees: Employee[] = [];

  newEmployee: Employee = {
    id: 0,
    name: '',
    department: '',
    isActive: true
  };

  displayedColumns: string[] = ['id','name','department'];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(){

    this.employeeService.getEmployees().subscribe(data=>{
      this.employees = data;
    });

  }

  addEmployee(){

    const employee: Employee = {
      id: this.employees.length + 1,
      name: this.newEmployee.name,
      department: this.newEmployee.department,
      isActive: true
    };

    this.employeeService.addEmployee(employee);

    this.newEmployee = {
      id:0,
      name:'',
      department:'',
      isActive:true
    };

  }

}