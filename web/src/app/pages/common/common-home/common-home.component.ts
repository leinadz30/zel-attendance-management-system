import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-common-home',
  templateUrl: './common-home.component.html',
  styleUrls: ['./common-home.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonHomeComponent {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      if(this.route.snapshot.data) {
      }
    }
}
