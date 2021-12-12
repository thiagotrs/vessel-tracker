import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { PortService } from 'src/app/shared/services/port.service';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styles: []
})
export class PortListComponent implements OnInit, OnDestroy {

  @Input() ports:Port[] = []

  portsSub!: Subscription

  constructor(private portService: PortService) { }

  ngOnInit(): void {
    this.portsSub = this.portService.getPorts().subscribe(ports => {this.ports = ports});
  }

  ngOnDestroy():void {
    this.portsSub.unsubscribe();
  }

}
