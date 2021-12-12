import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'span[app-badge]',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
  host: {
    'class': 'badge',
    '[class.btn-primary]': "color === 'primary'",
    '[class.btn-secondary]': "color === 'secondary'",
    '[class.btn-success]': "color === 'success'",
    '[class.btn-danger]': "color === 'danger'",
    '[class.btn-warning]': "color === 'warning'",
    '[class.btn-dark]': "color === 'dark'",
    '[class.rounded-pill]': "pill === '' || pill"
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent implements OnInit {

  @Input() color = 'primary'

  @Input() pill:'' | boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
