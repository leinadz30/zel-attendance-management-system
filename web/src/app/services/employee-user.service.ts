import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeUser } from 'src/app/model/employee-user';
import { ApiResponse } from '../model/api-response.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUserService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: EmployeeUser[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
    );
  }

  getByCode(employeeCode: string): Observable<ApiResponse<EmployeeUser>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.getByCode + employeeCode)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
    );
  }

  create(data: any): Observable<ApiResponse<EmployeeUser>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.create, data)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
    );
  }

  createFromEmployee(data: any): Observable<ApiResponse<EmployeeUser>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.createFromEmployee, data)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<EmployeeUser>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.update + id, data)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
    );
  }

  updatePassword(id: string, data: any): Observable<ApiResponse<EmployeeUser>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.updatePassword + id, data)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
    );
  }

  delete(employeeCode: string): Observable<ApiResponse<EmployeeUser>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUser.delete + employeeCode)
    .pipe(
      tap(_ => this.log('employee-user')),
      catchError(this.handleError('employee-user', []))
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
