import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vessel } from 'src/app/core/models/vessel.model';
import { VesselService } from 'src/app/shared/services/vessel.service';

@Component({
  selector: 'app-route-plan-vessels',
  templateUrl: './route-plan-vessels.component.html',
  styles: []
})
export class RoutePlanVesselsComponent implements OnInit {
  vessels$: Observable<Vessel[]>;

  constructor(private vesselService: VesselService) {
    this.vessels$ = this.vesselService.vessels$;
  }

  ngOnInit(): void {
    this.vesselService.loadVessels();
  }
}
