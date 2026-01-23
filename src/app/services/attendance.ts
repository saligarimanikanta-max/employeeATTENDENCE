import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'http://localhost:3000/attendance';

  constructor(private http: HttpClient) {}

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  saveAttendance(record: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, record);
  }
}
