import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { catchError, tap } from 'rxjs/operators';
import { IServices } from './interface/iservices';
import { AppConfigService } from './app-config.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { ApiResponse } from '../model/api-response.model';
import { Users } from '../model/users';
import { Operators } from '../model/operators';
import { Employees } from '../model/employees';
import { EmployeeUser } from '../model/employee-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IServices {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private appconfig: AppConfigService) { }

  loginOperator(data: any) : Observable<ApiResponse<Operators>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.loginOperator, data)
    .pipe(
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('auth', []))
    );
  }

  loginEmployeeUser(data: any) : Observable<ApiResponse<EmployeeUser>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.loginEmployeeUser, data)
    .pipe(
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('auth', []))
    );
  }

  redirectToPage(profile: any, auth: boolean) {
    if (profile && profile !== undefined && profile?.user && profile?.user?.userType === "OPERATOR") {
        this.router.navigate([auth ? '/auth/ops' : '/ops'], { replaceUrl: true });
    } else if(profile && profile !== undefined && profile?.user?.userType === "EMPLOYEE") {
      this.router.navigate([auth ? '/auth/org' : '/org'], { replaceUrl: true,  onSameUrlNavigation: "reload" });
    }
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
