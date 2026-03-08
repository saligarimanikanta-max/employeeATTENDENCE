import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Employee {
  id:number;
  name:string;
  department:string;
  isActive:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees = new BehaviorSubject<Employee[]>([
  {id:1,name:'John',department:'IT',isActive:true},
  {id:2,name:'Sarah',department:'HR',isActive:true},
  {id:3,name:'David',department:'Finance',isActive:true},
  {id:4,name:'Emma',department:'Marketing',isActive:true},
  {id:5,name:'Michael',department:'Operations',isActive:true},
  {id:6,name:'Sophia',department:'IT',isActive:true},
  {id:7,name:'Daniel',department:'HR',isActive:true},
  {id:8,name:'Olivia',department:'Finance',isActive:true},
  {id:9,name:'James',department:'Marketing',isActive:true},
  {id:10,name:'Isabella',department:'Operations',isActive:true}
]);

  employees$ = this.employees.asObservable();

  getEmployees(){
    return this.employees$;
  }

  addEmployee(emp:Employee){
    const current = this.employees.value;
    this.employees.next([...current,emp]);
  }

}