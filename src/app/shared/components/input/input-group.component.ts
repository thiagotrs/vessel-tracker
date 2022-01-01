import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { InputComponent } from './input.component';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styles: []
})
export class InputGroupComponent implements AfterContentInit {
  @Input() label: string = '';

  @ContentChild(InputComponent, { read: ElementRef })
  inputRef?: ElementRef<HTMLElement>;

  @ContentChild(InputComponent, { read: NgModel })
  inputModelRef?: NgModel;

  inputId: string = '';
  field?: NgModel;

  constructor() {}

  ngAfterContentInit() {
    this.inputId = this.inputRef?.nativeElement.id || '';
    this.field = this.inputModelRef;
  }

  getKeys(obj: Object | null) {
    if (obj === null) return [];
    return Object.keys(obj);
  }
}
