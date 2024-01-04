import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';
import { Operators } from '../model/operators';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Operators[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
    );
  }

  getByCode(operatorCode: string): Observable<ApiResponse<Operators>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.getByCode + operatorCode)
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
    );
  }

  create(data: any): Observable<ApiResponse<Operators>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.create, data)
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Operators>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.update + id, data)
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
    );
  }

  resetPassword(operatorCode: string, data: any): Observable<ApiResponse<Operators>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.resetPassword + operatorCode, data)
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
    );
  }

  approveAccessRequest(operatorCode: any): Observable<ApiResponse<Operators>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.approveAccessRequest + operatorCode, {})
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
    );
  }

  delete(operatorCode: string): Observable<ApiResponse<Operators>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.operators.delete + operatorCode)
    .pipe(
      tap(_ => this.log('operators')),
      catchError(this.handleError('operators', []))
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
