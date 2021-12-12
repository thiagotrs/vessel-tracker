import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Vessel } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-vessels-list',
  templateUrl: './vessels-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselsListComponent implements OnInit {

  @Input() vessels: Vessel[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
