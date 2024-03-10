import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkStudentRequestPageRoutingModule } from './link-student-request-routing.module';

import { LinkStudentRequestPage } from './link-student-request.page';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/core/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    PipeModule,
    LinkStudentRequestPageRoutingModule
  ],
  declarations: [LinkStudentRequestPage]
})
export class LinkStudentRequestPageModule {}
