import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { EmployeeTitles } from '../model/employee-titles';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTitlesService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: EmployeeTitles[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeTitles.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('employeeTitles')),
      catchError(this.handleError('employeeTitles', []))
    );
  }

  getByCode(employeeTitleCode: string): Observable<ApiResponse<EmployeeTitles>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeTitles.getByCode + employeeTitleCode)
    .pipe(
      tap(_ => this.log('employeeTitles')),
      catchError(this.handleError('employeeTitles', []))
    );
  }

  create(data: any): Observable<ApiResponse<EmployeeTitles>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeTitles.create, data)
    .pipe(
      tap(_ => this.log('employeeTitles')),
      catchError(this.handleError('employeeTitles', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<EmployeeTitles>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeTitles.update + id, data)
    .pipe(
      tap(_ => this.log('employeeTitles')),
      catchError(this.handleError('employeeTitles', []))
    );
  }

  delete(employeeTitleCode: string): Observable<ApiResponse<EmployeeTitles>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.employeeTitles.delete + employeeTitleCode)
    .pipe(
      tap(_ => this.log('employeeTitles')),
      catchError(this.handleError('employeeTitles', []))
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
