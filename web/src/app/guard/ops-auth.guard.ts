import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class OpsAuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let canActivate = false;
    const profile = this.storageService.getLoginProfile();
    if(!profile) {
      this.router.navigate(['auth/ops']);
    }
    // if(!profile.user.access) {
    //   this.router.navigate(['auth']);
    // }
    if(profile.user && profile.user.userId && profile.user.userType.toUpperCase() ==="OPERATOR") {
      canActivate = true;
    } else {
      this.router.navigate(['org']);
    }
    return canActivate;
  }

}
