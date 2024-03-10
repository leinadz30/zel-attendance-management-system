import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestInfoPageRoutingModule } from './request-info-routing.module';

import { RequestInfoPage } from './request-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestInfoPageRoutingModule
  ],
  declarations: [RequestInfoPage]
})
export class RequestInfoPageModule {}
