import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { LinkStudentRequest } from '../model/link-student-request';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class LinkStudentRequestService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: LinkStudentRequest[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.linkStudentRequest.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('linkStudentRequest')),
      catchError(this.handleError('linkStudentRequest', []))
    );
  }

  getByCode(linkStudentRequestCode: string): Observable<ApiResponse<LinkStudentRequest>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.linkStudentRequest.getByCode + linkStudentRequestCode)
    .pipe(
      tap(_ => this.log('linkStudentRequest')),
      catchError(this.handleError('linkStudentRequest', []))
    );
  }

  create(data: any): Observable<ApiResponse<LinkStudentRequest>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.linkStudentRequest.create, data)
    .pipe(
      tap(_ => this.log('linkStudentRequest')),
      catchError(this.handleError('linkStudentRequest', []))
    );
  }

  approve(id: string, data: any): Observable<ApiResponse<LinkStudentRequest>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.linkStudentRequest.approve + id, data)
    .pipe(
      tap(_ => this.log('linkStudentRequest')),
      catchError(this.handleError('linkStudentRequest', []))
    );
  }

  reject(linkStudentRequestCode: string, data: any): Observable<ApiResponse<LinkStudentRequest>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.linkStudentRequest.reject + linkStudentRequestCode, { body: data })
    .pipe(
      tap(_ => this.log('linkStudentRequest')),
      catchError(this.handleError('linkStudentRequest', []))
    );
  }

  cancel(linkStudentRequestCode: string, data: any): Observable<ApiResponse<LinkStudentRequest>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.linkStudentRequest.cancel + linkStudentRequestCode, { body: data })
    .pipe(
      tap(_ => this.log('linkStudentRequest')),
      catchError(this.handleError('linkStudentRequest', []))
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
