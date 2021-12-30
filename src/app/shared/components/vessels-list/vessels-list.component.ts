import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Stop, Vessel } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-vessels-list',
  templateUrl: './vessels-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselsListComponent {
  @Input() vessels: Vessel[] = [];

  constructor() {}

  filterLastPort(stops: Stop[]): string {
    if (!stops.length) return 'none';
    return stops[stops.length - 1].port.name;
  }
}
