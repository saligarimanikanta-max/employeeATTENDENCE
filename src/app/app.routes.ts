import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./components/employee-list/employee-list')
        .then(m => m.EmployeeListComponent)
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./components/attendance-tracker/attendance-tracker')
        .then(m => m.AttendanceTrackerComponent)
  },
  {
    path: 'leave-request',
    loadComponent: () =>
      import('./components/leave-request/leave-request')
        .then(m => m.LeaveRequestComponent)
  },
  {
    path: 'leave-approval',
    loadComponent: () =>
      import('./components/leave-approval/leave-approval')
        .then(m => m.LeaveApprovalComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
