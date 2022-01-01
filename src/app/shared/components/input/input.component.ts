import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[app-input]',
  template: '<ng-content></ng-content>',
  styles: []
})
export class InputComponent {
  @HostBinding('class') option = 'form-control form-control-lg';
  @HostBinding('attr.aria-describedby') aria =
    this.elementRef.nativeElement.id + 'Help';

  constructor(private elementRef: ElementRef) {}
}
