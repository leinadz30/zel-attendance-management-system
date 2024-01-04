import { NgModule } from '@angular/core';
import { DateFormatterComponent } from './date-formatter.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [DateFormatterComponent],
  declarations: [DateFormatterComponent]
})
export class DateFormatterModule { }
