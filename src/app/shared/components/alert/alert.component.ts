import { animate, query, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  host: {
    '[@openClosed]': "",
    '[@.disabled]': "disableAnimation"
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

  @Input() type: 'success' | 'danger' | 'warning' = 'warning'
  
  @Input() message?: string = ''

  @Input() disableAnimation: boolean = false

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit()
  }

}
