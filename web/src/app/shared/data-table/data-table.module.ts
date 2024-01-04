import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../material/material.module';
import { DataTableRangeFilterComponent } from './data-table-range-filter/data-table-range-filter.component';
import { DateFormatterModule } from '../date-formatter/date-formatter.module';



@NgModule({
  declarations: [DataTableComponent, DataTableRangeFilterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    DateFormatterModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
