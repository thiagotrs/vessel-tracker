import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'span[app-badge]',
  template: '<ng-content></ng-content>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() color = 'primary';

  @Input() pill: '' | boolean = false;

  @HostBinding('class') get options() {
    return {
      badge: true,
      'btn-primary': this.color === 'primary',
      'btn-secondary': this.color === 'secondary',
      'btn-success': this.color === 'success',
      'btn-danger': this.color === 'danger',
      'btn-warning': this.color === 'warning',
      'btn-dark': this.color === 'dark',
      'rounded-pill': this.pill === '' || this.pill
    };
  }

  constructor() {}
}
