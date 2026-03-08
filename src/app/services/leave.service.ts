import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private leaves = new BehaviorSubject<any[]>([]);
  leaves$ = this.leaves.asObservable();

  getLeaves(){
    return this.leaves$;
  }

  addLeave(leave:any){
    const current = this.leaves.value;
    this.leaves.next([...current,leave]);
  }

  updateLeave(){
    this.leaves.next([...this.leaves.value]);
  }

}