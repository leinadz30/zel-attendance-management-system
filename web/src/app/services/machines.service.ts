import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Machines } from '../model/machines';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class MachinesService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Machines[], total: number, requestingAccess: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.machines.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('machines')),
      catchError(this.handleError('machines', []))
    );
  }

  getByCode(machineCode: string): Observable<ApiResponse<Machines>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.machines.getByCode + machineCode)
    .pipe(
      tap(_ => this.log('machines')),
      catchError(this.handleError('machines', []))
    );
  }

  create(data: any): Observable<ApiResponse<Machines>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.machines.create, data)
    .pipe(
      tap(_ => this.log('machines')),
      catchError(this.handleError('machines', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Machines>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.machines.update + id, data)
    .pipe(
      tap(_ => this.log('machines')),
      catchError(this.handleError('machines', []))
    );
  }

  delete(machineCode: string): Observable<ApiResponse<Machines>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.machines.delete + machineCode)
    .pipe(
      tap(_ => this.log('machines')),
      catchError(this.handleError('machines', []))
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
