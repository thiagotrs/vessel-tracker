import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum DockActions {
  DOCK = "dock",
  UNDOCK = "undock",
}

@Component({
  selector: 'app-dock-button',
  templateUrl: './dock-button.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockButtonComponent implements OnInit {

  @Input() status:boolean = true

  @Output() onToggle = new EventEmitter<DockActions>()

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    if(this.status) {
      this.onToggle.emit(DockActions.DOCK);
    } else {
      this.onToggle.emit(DockActions.UNDOCK);
    }    
  }

}
