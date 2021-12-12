import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Port } from 'src/app/core/models/port.model';

@Component({
  selector: 'app-ports-list',
  templateUrl: './ports-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortsListComponent implements OnInit {

  @Input() ports!:Port[]

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  remove(id: number) {
    this.onDelete.emit(id)
  }

}
