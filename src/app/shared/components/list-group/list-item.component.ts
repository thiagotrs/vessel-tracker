import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="list-group-item p-3" [attr.aria-current]="isActive">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() isActive: boolean = false;

  constructor() {}
}
