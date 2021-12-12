import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <app-modal (onClose)="deny()" [title]="title">
      <p modal-body>{{message}}</p>
      <ng-container modal-footer>
        <button type="button" (click)="deny()" class="btn btn-secondary" data-bs-dismiss="modal">{{ denyTitle }}</button>
        <button type="button" (click)="confirm()" class="btn btn-primary">{{ confirmTitle }}</button>
      </ng-container>
    </app-modal>
  `,
  styles: []
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string = ''
  @Input() message:string = ''
  @Input() denyTitle: string = 'Close'
  @Input() confirmTitle: string = 'Save changes'

  @Output() onDeny: EventEmitter<void> = new EventEmitter<void>()
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  confirm() {
    this.onConfirm.emit();
  }

  deny() {
    this.onDeny.emit();
  }

}
