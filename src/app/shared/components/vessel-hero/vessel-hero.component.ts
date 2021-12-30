import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Vessel } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-vessel-hero',
  templateUrl: './vessel-hero.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselHeroComponent {
  @Input() vessel!: Vessel;

  constructor() {}
}
