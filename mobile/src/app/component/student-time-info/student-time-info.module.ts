import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentTimeInfoPageRoutingModule } from './student-time-info-routing.module';

import { StudentTimeInfoPage } from './student-time-info.page';
import { PipeModule } from 'src/app/core/pipe/pipe.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTimeInfoPageRoutingModule,
    MaterialModule,
    PipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [StudentTimeInfoPage]
})
export class StudentTimeInfoPageModule {}
