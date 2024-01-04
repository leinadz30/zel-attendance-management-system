import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Parents } from '../model/parents';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class ParentsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Parents[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
    );
  }

  getByCode(parentCode: string): Observable<ApiResponse<Parents>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.getByCode + parentCode)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
    );
  }

  create(data: any): Observable<ApiResponse<Parents>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.create, data)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
    );
  }

  updateProfile(parentCode: string, data: any): Observable<ApiResponse<Parents>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.updateProfile + parentCode, data)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
    );
  }

  resetPassword(parentCode: string, data: any): Observable<ApiResponse<Parents>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.resetPassword + parentCode, data)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
    );
  }

  updateProfilePicture(parentCode: string, data: any): Observable<ApiResponse<Parents>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.updateProfilePicture + parentCode, data)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
    );
  }

  delete(parentCode: string): Observable<ApiResponse<Parents>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.parents.delete + parentCode)
    .pipe(
      tap(_ => this.log('parents')),
      catchError(this.handleError('parents', []))
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
