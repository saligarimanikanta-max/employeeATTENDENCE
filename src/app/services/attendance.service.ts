import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private attendance = new BehaviorSubject<{[key:number]:string}>({});

  attendance$ = this.attendance.asObservable();

  markAttendance(empId:number,status:string){

    const current = this.attendance.value;

    current[empId] = status;

    this.attendance.next({...current});

  }

  getAttendance(){

    return this.attendance$;

  }

}