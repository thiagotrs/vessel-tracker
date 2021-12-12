import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Stop } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopsListComponent implements OnInit {

  @Input() stops!:Stop[]

  constructor() { }

  ngOnInit(): void {
  }

}
