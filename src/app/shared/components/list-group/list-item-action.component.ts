import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'a[app-list-item-action]',
  template: '<ng-content></ng-content>',
  styles: [],
  host: {
    'class': 'list-group-item list-group-item-action p-3',
    '[attr.aria-current]': "isActive"
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemActionComponent implements OnInit {

  @Input() isActive:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
