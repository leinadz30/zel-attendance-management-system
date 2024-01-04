import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Schools } from '../model/schools';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Schools[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schools.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('schools')),
      catchError(this.handleError('schools', []))
    );
  }

  getByCode(schoolCode: string): Observable<ApiResponse<Schools>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schools.getByCode + schoolCode)
    .pipe(
      tap(_ => this.log('schools')),
      catchError(this.handleError('schools', []))
    );
  }

  getByOrgCode(schoolCode: string): Observable<ApiResponse<Schools>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schools.getByOrgCode + schoolCode)
    .pipe(
      tap(_ => this.log('schools')),
      catchError(this.handleError('schools', []))
    );
  }

  create(data: any): Observable<ApiResponse<Schools>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schools.create, data)
    .pipe(
      tap(_ => this.log('schools')),
      catchError(this.handleError('schools', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Schools>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schools.update + id, data)
    .pipe(
      tap(_ => this.log('schools')),
      catchError(this.handleError('schools', []))
    );
  }

  delete(schoolCode: string): Observable<ApiResponse<Schools>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schools.delete + schoolCode)
    .pipe(
      tap(_ => this.log('schools')),
      catchError(this.handleError('schools', []))
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
