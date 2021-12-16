import { Component, OnInit } from '@angular/core';
import { PortService } from 'src/app/shared/services/port.service';
import { VesselService } from 'src/app/shared/services/vessel.service';

@Component({
  selector: 'app-route-plan',
  templateUrl: './route-plan.component.html',
  styles: []
})
export class RoutePlanComponent implements OnInit {

  constructor(
    private vesselService: VesselService,
    private portService: PortService
  ) { }

  ngOnInit(): void {
    this.portService.loadPorts()
    this.vesselService.loadVessels()
  }

}
