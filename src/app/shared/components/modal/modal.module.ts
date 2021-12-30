import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
  declarations: [ModalComponent, ConfirmModalComponent],
  imports: [CommonModule]
})
export class ModalModule {}
