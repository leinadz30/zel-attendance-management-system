import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { EmployeeUserAccess } from '../model/employee-user-access';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUserAccessService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation?: string; filter?: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: EmployeeUserAccess[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUserAccess.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('employeeUserAccess')),
      catchError(this.handleError('employeeUserAccess', []))
    );
  }

  getByCode(employeeUserAccessCode: string): Observable<ApiResponse<EmployeeUserAccess>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUserAccess.getByCode + employeeUserAccessCode)
    .pipe(
      tap(_ => this.log('employeeUserAccess')),
      catchError(this.handleError('employeeUserAccess', []))
    );
  }

  create(data: any): Observable<ApiResponse<EmployeeUserAccess>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUserAccess.create, data)
    .pipe(
      tap(_ => this.log('employeeUserAccess')),
      catchError(this.handleError('employeeUserAccess', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<EmployeeUserAccess>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUserAccess.update + id, data)
    .pipe(
      tap(_ => this.log('employeeUserAccess')),
      catchError(this.handleError('employeeUserAccess', []))
    );
  }

  delete(employeeUserAccessCode: string): Observable<ApiResponse<EmployeeUserAccess>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeUserAccess.delete + employeeUserAccessCode)
    .pipe(
      tap(_ => this.log('employeeUserAccess')),
      catchError(this.handleError('employeeUserAccess', []))
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
