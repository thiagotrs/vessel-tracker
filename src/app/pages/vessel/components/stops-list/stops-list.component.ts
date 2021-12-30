import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Stop } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopsListComponent {
  @Input() stops!: Stop[];

  constructor() {}
}
