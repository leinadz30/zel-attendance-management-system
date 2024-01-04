import { Injectable } from '@angular/core';
import { Parents } from '../model/parents';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  getLoginUser(): Parents {
    const user = this.get('loginUser');
    if(user !== null && user !== ''){
      return JSON.parse(user);
    }
    else {return null;}
  }
  saveLoginUser(value: Parents){
    return this.set('loginUser', JSON.stringify(value));
  }
  getAccessToken(){
    return this.get('accessToken');
  }
  saveAccessToken(value: any){
    return this.set('accessToken', value);
  }
  getFirebaseToken(){
    return this.get('firebaseToken');
  }
  saveFirebaseToken(value: any){
    return this.set('firebaseToken', value);
  }
  getOneSignalSubscriptionId(){
    return this.get('oneSignalSubscriptionId');
  }
  saveOneSignalSubscriptionId(value: any){
    return this.set('oneSignalSubscriptionId', value);
  }
  getRefreshToken(){
    return this.get('refreshToken');
  }
  saveRefreshToken(value: any){
    return this.set('refreshToken', value);
  }
  getTotalUnreadNotif(){
    return this.get('totalUnreadNotif');
  }
  saveTotalUnreadNotif(value: any){
    return this.set('totalUnreadNotif', value);
  }
  getSessionExpiredDate(){
    return this.get('sessionExpiredDate');
  }
  saveSessionExpiredDate(value: any){
    return this.set('sessionExpiredDate', value);
  }
  getThemeIsDarkMode(): any{
    return this.get('themeIsDarkMode') && this.get('themeIsDarkMode').toLowerCase().includes('true');
  }
  saveThemeIsDarkMode(value: any){
    return this.set('themeIsDarkMode', value);
  }
  private set(key: string, value: any){
    localStorage.setItem(key, value);
  }
  private get(key: string){
    return localStorage.getItem(key);
  }
}
