import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
    '.modal-backdrop {background: rgba(0, 0, 0, 0.75)}',
    '.modal {display: block}'
  ]
})
export class ModalComponent implements OnInit {

  @Input() title: string = ''

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit();
  }

}
