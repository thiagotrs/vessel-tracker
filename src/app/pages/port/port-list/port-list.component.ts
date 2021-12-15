import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { PortService } from 'src/app/shared/services/port.service';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styles: []
})
export class PortListComponent implements OnInit {

  @Input() ports:Port[] = []

  ports$: Observable<Port[]>

  constructor(private portService: PortService) {
    this.ports$ = this.portService.ports$
  }

  ngOnInit(): void {
    this.portService.loadPorts()
  }

}
