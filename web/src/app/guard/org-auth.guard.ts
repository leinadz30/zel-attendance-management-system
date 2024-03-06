import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { EmployeeUser } from '../model/employee-user';

@Injectable({
  providedIn: 'root'
})
export class OrgAuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let canActivate = false;
    const profile: EmployeeUser = this.storageService.getLoginProfile();
    if(!profile) {
      this.router.navigate(['auth/org']);
    }
    if(!profile.employeeUserAccess) {
      this.router.navigate(['auth/org']);
    }

    if(next.data["title"] && !["home","dashboard"].some(x=>x === next.data["title"].toLowerCase()) &&
    (profile.employeeUserAccess && !profile.employeeUserAccess.accessPages.some(x=>x.page.trim().toUpperCase() === next.data["title"].trim().toUpperCase() && x.view.toString() === "true"))) {
      this.router.navigate(['org/no-access'], {
        state: {
          "no-access-url": state.url,
          "no-access-page": next.data["title"]
        }
      });
    }
    if(profile.user && profile.user.userId && profile.user.userType.toUpperCase() ==="EMPLOYEE") {
      canActivate = true;
    } else {
      this.router.navigate(['ops']);
    }
    if(canActivate && next.data && next.data["title"]) {
      next.data = {
        ...next.data,
        employeeUserAccess: profile.employeeUserAccess && profile.employeeUserAccess.accessPages.find(x=>x.page.trim().toUpperCase() === next.data["title"].toString().toUpperCase())
      };
    }
    return canActivate;
  }

}
