import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Port } from 'src/app/core/models/port.model';

@Component({
  selector: 'app-ports-list',
  templateUrl: './ports-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortsListComponent implements OnInit {

  @Input() ports!:Port[]

  constructor() { }

  ngOnInit(): void {
  }

}
