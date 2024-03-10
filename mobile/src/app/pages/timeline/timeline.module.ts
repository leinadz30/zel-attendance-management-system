import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelinePageRoutingModule } from './timeline-routing.module';

import { TimelinePage } from './timeline.page';
import { MaterialModule } from 'src/app/material/material.module';
import { DateFormatterModule } from 'src/app/component/date-formatter/date-formatter.module';
import { PipeModule } from '../../core/pipe/pipe.module';

@NgModule({
    declarations: [TimelinePage],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        MaterialModule,
        TimelinePageRoutingModule,
        DateFormatterModule,
        PipeModule
    ]
})
export class TimelinePageModule {}
