import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Departments } from '../model/departments';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Departments[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.departments.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('departments')),
      catchError(this.handleError('departments', []))
    );
  }

  getByCode(departmentCode: string): Observable<ApiResponse<Departments>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.departments.getByCode + departmentCode)
    .pipe(
      tap(_ => this.log('departments')),
      catchError(this.handleError('departments', []))
    );
  }

  create(data: any): Observable<ApiResponse<Departments>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.departments.create, data)
    .pipe(
      tap(_ => this.log('departments')),
      catchError(this.handleError('departments', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Departments>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.departments.update + id, data)
    .pipe(
      tap(_ => this.log('departments')),
      catchError(this.handleError('departments', []))
    );
  }

  delete(departmentCode: string): Observable<ApiResponse<Departments>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.departments.delete + departmentCode)
    .pipe(
      tap(_ => this.log('departments')),
      catchError(this.handleError('departments', []))
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
