import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[app-button], a[app-button], input[app-button][type=submit], input[app-button][type=button], input[app-button][type=reset], button[app-button]',
  template: '<ng-content></ng-content>',
  styles: [],
  host: {
    'class': 'btn',
    '[class.btn-primary]': "color === 'primary' && !outlineB",
    '[class.btn-secondary]': "color === 'secondary' && !outlineB",
    '[class.btn-success]': "color === 'success' && !outlineB",
    '[class.btn-danger]': "color === 'danger' && !outlineB",
    '[class.btn-warning]': "color === 'warning' && !outlineB",
    '[class.btn-dark]': "color === 'dark' && !outlineB",
    '[class.btn-outline-primary]': "color === 'primary' && outlineB",
    '[class.btn-outline-secondary]': "color === 'secondary' && outlineB",
    '[class.btn-outline-success]': "color === 'success' && outlineB",
    '[class.btn-outline-danger]': "color === 'danger' && outlineB",
    '[class.btn-outline-warning]': "color === 'warning' && outlineB",
    '[class.btn-outline-dark]': "color === 'dark' && outlineB",
    '[class.btn-lg]': "size === 'large'",
    '[class.btn-sm]': "size === 'small'",
    '[attr.role]': "elementTagName === 'A' ? 'button' : null"
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'dark' = 'primary'
  
  @Input() size?: 'large' | 'small'
  
  @Input() outline: '' | boolean = false

  get outlineB() {
    return this.outline === '' || this.outline
  }

  private elementTagName:string

  constructor(private elementRef: ElementRef) {
    this.elementTagName = this.elementRef.nativeElement.tagName
  }

  ngOnInit(): void {
  }

}
