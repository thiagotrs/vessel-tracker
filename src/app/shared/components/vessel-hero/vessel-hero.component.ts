import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status, Vessel } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-vessel-hero',
  templateUrl: './vessel-hero.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselHeroComponent {
  @Input() vessel!: Vessel;

  isSailing(vessel: Vessel): boolean {
    return vessel.status === Status.SAILING;
  }

  constructor() {}
}
