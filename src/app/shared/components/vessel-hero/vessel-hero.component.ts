import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vessel } from 'src/app/core/models/vessel.model';



@Component({
  selector: 'app-vessel-hero',
  templateUrl: './vessel-hero.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselHeroComponent implements OnInit {

  @Input() vessel!: Vessel

  constructor() { }

  ngOnInit(): void {
  }

}
