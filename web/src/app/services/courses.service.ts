import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Courses } from '../model/courses';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class CoursesService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Courses[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.courses.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('courses')),
      catchError(this.handleError('courses', []))
    );
  }

  getByCode(courseCode: string): Observable<ApiResponse<Courses>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.courses.getByCode + courseCode)
    .pipe(
      tap(_ => this.log('courses')),
      catchError(this.handleError('courses', []))
    );
  }

  create(data: any): Observable<ApiResponse<Courses>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.courses.create, data)
    .pipe(
      tap(_ => this.log('courses')),
      catchError(this.handleError('courses', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Courses>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.courses.update + id, data)
    .pipe(
      tap(_ => this.log('courses')),
      catchError(this.handleError('courses', []))
    );
  }

  delete(courseCode: string): Observable<ApiResponse<Courses>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.courses.delete + courseCode)
    .pipe(
      tap(_ => this.log('courses')),
      catchError(this.handleError('courses', []))
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
