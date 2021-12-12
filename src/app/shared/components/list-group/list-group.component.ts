import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-group',
  template: `
  <div class="list-group my-3">
    <ng-content></ng-content>
  </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
