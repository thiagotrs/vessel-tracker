import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group.component';
import { ListItemComponent } from './list-item.component';
import { ListItemActionComponent } from './list-item-action.component';



@NgModule({
  declarations: [
    ListGroupComponent,
    ListItemComponent,
    ListItemActionComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ListGroupComponent,
    ListItemComponent,
    ListItemActionComponent
  ]
})
export class ListGroupModule { }
