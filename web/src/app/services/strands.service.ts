import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Strands } from '../model/strands';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class StrandsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Strands[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.strands.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('strands')),
      catchError(this.handleError('strands', []))
    );
  }

  getByCode(strandCode: string): Observable<ApiResponse<Strands>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.strands.getByCode + strandCode)
    .pipe(
      tap(_ => this.log('strands')),
      catchError(this.handleError('strands', []))
    );
  }

  create(data: any): Observable<ApiResponse<Strands>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.strands.create, data)
    .pipe(
      tap(_ => this.log('strands')),
      catchError(this.handleError('strands', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Strands>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.strands.update + id, data)
    .pipe(
      tap(_ => this.log('strands')),
      catchError(this.handleError('strands', []))
    );
  }

  delete(strandCode: string): Observable<ApiResponse<Strands>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.strands.delete + strandCode)
    .pipe(
      tap(_ => this.log('strands')),
      catchError(this.handleError('strands', []))
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
