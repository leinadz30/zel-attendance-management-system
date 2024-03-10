import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLinkStudentRequestsPageRoutingModule } from './my-link-student-requests-routing.module';

import { MyLinkStudentRequestsPage } from './my-link-student-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLinkStudentRequestsPageRoutingModule
  ],
  declarations: [MyLinkStudentRequestsPage]
})
export class MyLinkStudentRequestsPageModule {}
