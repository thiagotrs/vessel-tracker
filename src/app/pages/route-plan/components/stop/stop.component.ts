import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Stop } from 'src/app/core/models/vessel.model';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopComponent implements OnInit {

  @Input() stop!: Stop

  constructor() { }

  ngOnInit(): void {
  }

}
