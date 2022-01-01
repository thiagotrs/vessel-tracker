import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalModule } from '../modal/modal.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, ModalModule, ButtonModule],
  exports: [ConfirmModalComponent]
})
export class ConfirmModalModule {}
