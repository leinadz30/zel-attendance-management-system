import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { SchoolYearLevels } from '../model/school-year-levels';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearLevelsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: SchoolYearLevels[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schoolYearLevels.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('schoolYearLevels')),
      catchError(this.handleError('schoolYearLevels', []))
    );
  }

  getByCode(schoolYearLevelCode: string): Observable<ApiResponse<SchoolYearLevels>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schoolYearLevels.getByCode + schoolYearLevelCode)
    .pipe(
      tap(_ => this.log('schoolYearLevels')),
      catchError(this.handleError('schoolYearLevels', []))
    );
  }

  create(data: any): Observable<ApiResponse<SchoolYearLevels>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schoolYearLevels.create, data)
    .pipe(
      tap(_ => this.log('schoolYearLevels')),
      catchError(this.handleError('schoolYearLevels', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<SchoolYearLevels>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schoolYearLevels.update + id, data)
    .pipe(
      tap(_ => this.log('schoolYearLevels')),
      catchError(this.handleError('schoolYearLevels', []))
    );
  }

  delete(schoolYearLevelCode: string): Observable<ApiResponse<SchoolYearLevels>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.schoolYearLevels.delete + schoolYearLevelCode)
    .pipe(
      tap(_ => this.log('schoolYearLevels')),
      catchError(this.handleError('schoolYearLevels', []))
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
