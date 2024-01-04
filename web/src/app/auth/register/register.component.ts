import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  logInForm = this.formBuilder.group({
    mobileNumber: ['', Validators.required],
    password: ['', Validators.required]
  });
  ops = false;
  loading = false;
  submitted = false;
  error: string;
  isProcessing = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    private router: Router) {
      // redirect to home if already logged in

      const user = localStorage.getItem("user");
      if (user && JSON.parse(user??"") !== null && JSON.parse(user??"") !== undefined) {
          this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.logInForm.controls.password.errors
  }

  onSubmit() {
    if (this.logInForm.invalid) {
        return;
    }
    return;
    try{
      const params = this.logInForm.value;
      this.spinner.show();
    } catch (e){
      this.spinner.hide();
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
    }
  }
}
