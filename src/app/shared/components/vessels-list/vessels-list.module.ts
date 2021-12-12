import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselsListComponent } from './vessels-list.component';
import { BadgeModule } from '../badge/badge.module';
import { ListGroupModule } from '../list-group/list-group.module';
import { RouterModule } from '@angular/router';
import { LastPortFilterPipe } from './last-port-filter.pipe';



@NgModule({
  declarations: [
    VesselsListComponent,
    LastPortFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    ListGroupModule
  ],
  exports: [
    VesselsListComponent
  ]
})
export class VesselsListModule { }
