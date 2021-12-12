import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vessel } from 'src/app/core/models/vessel.model';
import { VesselService } from 'src/app/shared/services/vessel.service';

@Component({
  selector: 'app-route-plan-vessels',
  templateUrl: './route-plan-vessels.component.html',
  styles: []
})
export class RoutePlanVesselsComponent implements OnInit, OnDestroy {

  vessels:Vessel[] = []

  private vesselsSub!: Subscription

  constructor(private vesselService: VesselService) {
  }

  ngOnInit(): void {
    this.vesselsSub = this.vesselService.getVessels().subscribe(vessels => {this.vessels = vessels});
  }

  ngOnDestroy(): void {
    this.vesselsSub.unsubscribe();
  }

}
