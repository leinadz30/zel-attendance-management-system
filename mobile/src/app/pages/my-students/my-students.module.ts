import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyStudentsPage } from './my-students.page';

import { MyStudentsPageRoutingModule } from './my-students-routing.module';
import { CensoredStringPipe } from 'src/app/core/pipe/censored-string.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MyStudentsPageRoutingModule
  ],
  declarations: [MyStudentsPage],
  providers: [CensoredStringPipe]
})
export class MyStudentsPageModule {}
