import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Vessel } from 'src/app/core/models/vessel.model';
import { VesselService } from 'src/app/shared/services/vessel.service';
import { DockActions } from '../components/dock-button/dock-button.component';

@Component({
  selector: 'app-vessel-detail',
  templateUrl: './vessel-detail.component.html',
  styles: []
})
export class VesselDetailComponent implements OnInit, OnDestroy {

  private id:string

  vessel!: Vessel
  isLoading$: Observable<boolean>
  
  private vesselSub!: Subscription

  constructor(
    private vesselService: VesselService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.isLoading$ = this.vesselService.isLoading$
  }

  ngOnInit(): void {
    this.vesselService.loadVesselById(this.id)
    this.vesselSub = this.vesselService.selectedVessel$.subscribe(vessel => {
      this.vessel = vessel as Vessel
    })
  }

  toggleDock(actionType: DockActions) {
    if(actionType === DockActions.DOCK) {
      this.vesselService.dockVessel(this.id)
    } else if(actionType === DockActions.UNDOCK) {
      this.vesselService.unDockVessel(this.id)
    }
  }

  ngOnDestroy():void {
    this.vesselSub.unsubscribe();
  }
  
}
