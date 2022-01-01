import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from './input-group.component';

@NgModule({
  declarations: [InputComponent, InputGroupComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputComponent, InputGroupComponent]
})
export class InputModule {}
