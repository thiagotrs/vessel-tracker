import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Port } from 'src/app/core/models/port.model';

@Component({
  selector: 'app-ports-list',
  templateUrl: './ports-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortsListComponent {
  @Input() ports!: Port[];

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  remove(id: number) {
    this.delete.emit(id);
  }
}
