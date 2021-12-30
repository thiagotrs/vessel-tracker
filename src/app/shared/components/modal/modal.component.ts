import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
    '.modal-backdrop {background: rgba(0, 0, 0, 0.75)}',
    '.modal {display: block}'
  ]
})
export class ModalComponent {
  @Input() title: string = '';

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  close() {
    this.closeModal.emit();
  }
}
