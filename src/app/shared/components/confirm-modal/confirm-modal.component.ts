import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: []
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() denyTitle: string = 'Close';
  @Input() confirmTitle: string = 'Save changes';

  @Output() deny: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  confirmAction() {
    this.confirm.emit();
  }

  denyAction() {
    this.deny.emit();
  }
}
