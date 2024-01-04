import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/compiler';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  logInForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  isProcessing = false;
  isOps = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router) {
      this.isOps = this.route.snapshot.data && route.snapshot.data["ops"];
      const user = this.storageService.getLoginProfile();
      if(user) {
        this.authService.redirectToPage(user, false);
      }
    }

  ngOnInit() {
    if(this.isOps) {
      this.logInForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
    } else {
      this.logInForm = this.formBuilder.group({
        schoolCode: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  onSubmit() {
    if (this.logInForm.invalid) {
        return;
    }
    console.log(this.logInForm.value);
    try{
      const params = this.logInForm.value;
      if(this.isOps) {
        this.authService.loginOperator(params)
          .subscribe(async (res) => {
            if (res.success) {
              this.storageService.saveLoginProfile(res.data);
              this.authService.redirectToPage(res.data, false);
              this.router.navigate(['/ops'], { replaceUrl: true,  onSameUrlNavigation: "reload" });
            } else {
              this.error = Array.isArray(res.message) ? res.message[0] : res.message;
              this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
            }
          }, async (res) => {
            this.error = res.error.message;
            this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          });
      } else {
        this.authService.loginEmployeeUser(params)
          .subscribe(async res => {
            if (res.success) {
              this.storageService.saveLoginProfile(res.data);
              this.authService.redirectToPage(res.data, false);
              this.router.navigate(['/org'], { replaceUrl: true,  onSameUrlNavigation: "reload" });
            } else {
              this.error = Array.isArray(res.message) ? res.message[0] : res.message;
              this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
            }
          }, async (res) => {
            this.error = res.error.message;
            this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          });
      }
    } catch (e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
    }
  }
}
