import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent {
  url = "";
  page = "";
  host = `${window.location.protocol}//${window.location.hostname}`;
  constructor(private storageService: StorageService,
    private authService: AuthService) {
    this.url = window.history.state["no-access-url"];
    this.page = window.history.state["no-access-page"];
  }

  login() {
    const profile = this.storageService.getLoginProfile();
    this.storageService.saveLoginProfile(null);
    this.authService.redirectToPage(profile, true)
  }
}
