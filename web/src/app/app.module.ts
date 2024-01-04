import { SelectDepartmentDialogComponent } from './shared/select-department-dialog/select-department-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AppConfigService } from './services/app-config.service';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptors';
import { OptionSheetComponent } from './shared/option-sheet/option-sheet.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter } from './shared/utility/app-date-adapter';
import { OrgComponent } from './pages/organization/organization.component';
import { OpsComponent } from './pages/operations/operations.component';
import { TimeagoClock, TimeagoModule } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';
import { PusherService } from './services/pusher.service';
import { SelectSchoolDialogComponent } from './shared/select-school-dialog/select-school-dialog.component';
import { SelectSchoolYearLevelDialogComponent } from './shared/select-school-year-level-dialog/select-school-year-level-dialog.component';
import { SelectEmployeeTitleDialogComponent } from './shared/select-employee-title-dialog/select-employee-title-dialog.component';
import { SelectEmployeeDialogComponent } from './shared/select-employee-dialog/select-employee-dialog.component';
import { SelectCourseDialogComponent } from './shared/select-course-dialog/select-course-dialog.component';
import { SelectSectionDialogComponent } from './shared/select-section-dialog/select-section-dialog.component';
import { SelectStrandDialogComponent } from './shared/select-strand-dialog/select-strand-dialog.component';

export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return interval(1000);
  }
}

export function loadCrucialData() {
  return function() {
    // or use UserService
    return delay(100000);
  }
}

export function delay(delay: number) {
  return function() {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
  }
}


@NgModule({
  declarations: [
    AppComponent,
    OpsComponent,
    OrgComponent,
    ProfileComponent,
    AuthComponent,
    AlertDialogComponent,
    PageNotFoundComponent,
    OptionSheetComponent,
    NoAccessComponent,
    SelectSchoolDialogComponent,
    SelectSchoolYearLevelDialogComponent,
    SelectDepartmentDialogComponent,
    SelectEmployeeTitleDialogComponent,
    SelectEmployeeDialogComponent,
    SelectCourseDialogComponent,
    SelectSectionDialogComponent,
    SelectStrandDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(),
    TimeagoModule.forRoot({
      formatter: {provide: TimeagoClock, useClass: MyClock },
    })
  ],
  providers: [
    PusherService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} },
    {
      provide : APP_INITIALIZER,
      multi : true,
      deps : [AppConfigService],
      useFactory : (config : AppConfigService) =>  () => config.loadAppConfig()
    },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: loadCrucialData()
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {provide: DateAdapter, useClass: AppDateAdapter},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
