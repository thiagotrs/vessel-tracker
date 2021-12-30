import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[app-list-item-action]',
  template: '<ng-content></ng-content>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemActionComponent {
  @HostBinding('attr.aria-current') @Input() isActive: boolean = false;

  @HostBinding('class') classes = 'list-group-item list-group-item-action p-3';

  constructor() {}
}
