import { Injectable } from '@angular/core';
import { Operators } from '../model/operators';
import { Employees } from '../model/employees';
import { EmployeeUser } from '../model/employee-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLoginProfile(): any {
    const profile = this.get('loginProfile');
    if(profile !== null && profile !== ''){
      return JSON.parse(profile);
    }
    else {return null;}
  }
  saveLoginProfile(value: Operators | EmployeeUser){
    return this.set('loginProfile', JSON.stringify(value));
  }
  getOpsRecentSchool(){
    const schoolCode = this.get('OpsRecentSchool');
    if(schoolCode !== null && schoolCode !== '' && schoolCode !== 'null'){
      return schoolCode;
    }
    else {
      return null;
    }
  }
  saveOpsRecentSchool(schoolCode: string){
    return this.set('OpsRecentSchool', schoolCode);
  }
  getAccessToken(){
    return this.get('accessToken');
  }
  saveAccessToken(value: any){
    return this.set('accessToken', value);
  }
  getRefreshToken(){
    return this.get('refreshToken');
  }
  saveRefreshToken(value: any){
    return this.set('refreshToken', value);
  }
  getSessionExpiredDate(){
    return this.get('sessionExpiredDate');
  }
  saveSessionExpiredDate(value: any){
    return this.set('sessionExpiredDate', value);
  }
  private set(key: string, value: any){
    localStorage.setItem(key, value);
  }
  private get(key: string){
    return localStorage.getItem(key);
  }
}
