import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { AttendanceTrackerComponent } from './components/attendance-tracker/attendance-tracker';
import { LeaveRequestComponent } from './components/leave-request/leave-request';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'attendance', component: AttendanceTrackerComponent },
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: 'leave-approval', component: LeaveApprovalComponent }
];