import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employees } from 'src/app/model/employees';
import { ApiResponse } from '../model/api-response.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Employees[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employees.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('employees')),
      catchError(this.handleError('employees', []))
    );
  }

  getByCode(employeeCode: string): Observable<ApiResponse<Employees>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employees.getByCode + employeeCode)
    .pipe(
      tap(_ => this.log('employees')),
      catchError(this.handleError('employees', []))
    );
  }

  create(data: any): Observable<ApiResponse<Employees>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employees.create, data)
    .pipe(
      tap(_ => this.log('employees')),
      catchError(this.handleError('employees', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Employees>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employees.update + id, data)
    .pipe(
      tap(_ => this.log('employees')),
      catchError(this.handleError('employees', []))
    );
  }

  delete(employeeCode: string): Observable<ApiResponse<Employees>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employees.delete + employeeCode)
    .pipe(
      tap(_ => this.log('employees')),
      catchError(this.handleError('employees', []))
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
