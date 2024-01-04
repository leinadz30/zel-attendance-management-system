import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { TapLogs } from '../model/tap-logs';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

export class StudentTapTracker {
  studentId: string;
  studentCode: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  cardNumber: string;
  mobileNumber: string;
  email: any;
  address: string;
  registrationDate: string;
  fullName: string;
  logs: {
    tapLogId: number;
    status: string;
    time: string;
    dateTime: string;
  }[];
  status: string;
  arrivedTime: string;
  recentTapTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class TapLogsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params: {
    order: any;
    columnDef: { apiNotation: string; filter: string }[];
    pageSize: number;
    pageIndex: number;
  }): Observable<ApiResponse<{ results: TapLogs[]; total: number; requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.tapLogs.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('tapLogs')),
      catchError(this.handleError('tapLogs', []))
    );
  }

  getStudentsTapsByParentCode(parentCode: string, params: any): Observable<ApiResponse<StudentTapTracker[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.tapLogs.getStudentsTapsByParentCode + parentCode,
      { params })
    .pipe(
      tap(_ => this.log('tapLogs')),
      catchError(this.handleError('tapLogs', []))
    );
  }

  getStudentsTapsByStudentCode(studentCode: string, params: any): Observable<ApiResponse<TapLogs[]>> {
    return this.http.get<any>(environment.apiBaseUrl +
      this.appconfig.config.apiEndPoints.tapLogs.getStudentsTapsByStudentCode + studentCode,
      { params })
    .pipe(
      tap(_ => this.log('tapLogs')),
      catchError(this.handleError('tapLogs', []))
    );
  }

  getById(tapLogId: string): Observable<ApiResponse<TapLogs>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.tapLogs.getById + tapLogId)
    .pipe(
      tap(_ => this.log('tapLogs')),
      catchError(this.handleError('tapLogs', []))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${Array.isArray(error.error.message) ? error.error.message[0] : error.error.message}`);
      return of(error.error as T);
    };
  }

  log(message: string) {
    console.log(message);
  }
}
