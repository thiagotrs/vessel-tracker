import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Stop } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopComponent {
  @Input() stop!: Stop;

  constructor() {}
}
