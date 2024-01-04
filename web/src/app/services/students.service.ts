import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Students } from '../model/students';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class StudentsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Students[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.students.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('students')),
      catchError(this.handleError('students', []))
    );
  }

  getByCode(studentCode: string): Observable<ApiResponse<Students>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.students.getByCode + studentCode)
    .pipe(
      tap(_ => this.log('students')),
      catchError(this.handleError('students', []))
    );
  }

  getByOrgStudentId(orgStudentId: string): Observable<ApiResponse<Students>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.students.getByOrgStudentId + orgStudentId)
    .pipe(
      tap(_ => this.log('students')),
      catchError(this.handleError('students', []))
    );
  }

  create(data: any): Observable<ApiResponse<Students>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.students.create, data)
    .pipe(
      tap(_ => this.log('students')),
      catchError(this.handleError('students', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Students>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.students.update + id, data)
    .pipe(
      tap(_ => this.log('students')),
      catchError(this.handleError('students', []))
    );
  }

  delete(studentCode: string): Observable<ApiResponse<Students>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.students.delete + studentCode)
    .pipe(
      tap(_ => this.log('students')),
      catchError(this.handleError('students', []))
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
