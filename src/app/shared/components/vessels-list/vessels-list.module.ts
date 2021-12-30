import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselsListComponent } from './vessels-list.component';
import { BadgeModule } from '../badge/badge.module';
import { ListGroupModule } from '../list-group/list-group.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VesselsListComponent],
  imports: [CommonModule, RouterModule, BadgeModule, ListGroupModule],
  exports: [VesselsListComponent]
})
export class VesselsListModule {}
