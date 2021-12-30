import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

export enum DockActions {
  DOCK = 'dock',
  UNDOCK = 'undock'
}

@Component({
  selector: 'app-dock-button',
  templateUrl: './dock-button.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockButtonComponent {
  @Input() status: boolean = true;

  @Output() toggle = new EventEmitter<DockActions>();

  constructor() {}

  toggleAction() {
    if (this.status) {
      this.toggle.emit(DockActions.DOCK);
    } else {
      this.toggle.emit(DockActions.UNDOCK);
    }
  }
}
