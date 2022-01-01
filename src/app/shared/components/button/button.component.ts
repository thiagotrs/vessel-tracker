import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  selector:
    // eslint-disable-next-line @angular-eslint/component-selector
    'button[app-button], a[app-button], input[app-button][type=submit], input[app-button][type=button], input[app-button][type=reset]',
  template: '<ng-content></ng-content>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'dark'
    | 'light' = 'primary';

  @Input() size?: 'large' | 'small';

  @Input() outline: '' | boolean = false;

  @HostBinding('class') get options() {
    return {
      btn: true,
      'btn-primary': this.color === 'primary' && this.outline === false,
      'btn-secondary': this.color === 'secondary' && this.outline === false,
      'btn-success': this.color === 'success' && this.outline === false,
      'btn-danger': this.color === 'danger' && this.outline === false,
      'btn-warning': this.color === 'warning' && this.outline === false,
      'btn-dark': this.color === 'dark' && this.outline === false,
      'btn-light': this.color === 'light' && this.outline === false,
      'btn-outline-primary': this.color === 'primary' && this.outline !== false,
      'btn-outline-secondary':
        this.color === 'secondary' && this.outline !== false,
      'btn-outline-success': this.color === 'success' && this.outline !== false,
      'btn-outline-danger': this.color === 'danger' && this.outline !== false,
      'btn-outline-warning': this.color === 'warning' && this.outline !== false,
      'btn-outline-dark': this.color === 'dark' && this.outline !== false,
      'btn-outline-light': this.color === 'light' && this.outline !== false,
      'btn-lg': this.size === 'large',
      'btn-sm': this.size === 'small'
    };
  }

  @HostBinding('attr.role') get role() {
    return this.elementRef.nativeElement.tagName === 'A' ? 'button' : null;
  }

  constructor(private elementRef: ElementRef) {}
}
