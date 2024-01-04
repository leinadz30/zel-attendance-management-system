import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Sections } from '../model/sections';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class SectionsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Sections[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.sections.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('sections')),
      catchError(this.handleError('sections', []))
    );
  }

  getByCode(sectionCode: string): Observable<ApiResponse<Sections>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.sections.getByCode + sectionCode)
    .pipe(
      tap(_ => this.log('sections')),
      catchError(this.handleError('sections', []))
    );
  }

  create(data: any): Observable<ApiResponse<Sections>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.sections.create, data)
    .pipe(
      tap(_ => this.log('sections')),
      catchError(this.handleError('sections', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Sections>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.sections.update + id, data)
    .pipe(
      tap(_ => this.log('sections')),
      catchError(this.handleError('sections', []))
    );
  }

  delete(sectionCode: string): Observable<ApiResponse<Sections>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.sections.delete + sectionCode)
    .pipe(
      tap(_ => this.log('sections')),
      catchError(this.handleError('sections', []))
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
