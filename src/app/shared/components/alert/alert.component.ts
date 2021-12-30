import {
  animate,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [],
  animations: [
    trigger('openClosed', [
      transition(':enter', [
        query('.alert', [
          style({ opacity: 0 }),
          animate(500, style({ opacity: 1 }))
        ])
      ]),
      transition(':leave', [
        query('.alert', [
          style({ opacity: 1 }),
          animate(500, style({ opacity: 0 }))
        ])
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' = 'warning';

  @Input() message?: string = '';

  @HostBinding('@.disabled') @Input() disableAnimation: boolean = false;

  @HostBinding('@openClosed') openClosed = '';

  @Output() closeAlert: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  close() {
    this.closeAlert.emit();
  }
}
