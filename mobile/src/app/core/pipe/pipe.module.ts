import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago.pipe';
import { NumberLeadZeroPipe } from './number-lead-zero.pipe';
import { CensoredStringPipe } from './censored-string.pipe';



@NgModule({
  declarations: [
    TimeAgoPipe,
    NumberLeadZeroPipe,
    CensoredStringPipe
  ],
  exports: [
    TimeAgoPipe,
    NumberLeadZeroPipe,
    CensoredStringPipe
  ],
})
export class PipeModule { }
