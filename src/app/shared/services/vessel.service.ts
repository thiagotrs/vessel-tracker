import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Vessel } from 'src/app/core/models/vessel.model';
import { addVessel, dockVessel, editNextRoutes, loadVessels, selectVesselById, selectVesselError, selectVessels, undockVessel } from '../store/vessel.state';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  vessels$: Observable<Vessel[]>
  vesselError$: Observable<string | null>

  constructor(private store: Store) {
    this.vessels$ = this.store.select(selectVessels)
    this.vesselError$ = this.store.select(selectVesselError)
  }

  loadVessels(): void {
    this.store.dispatch(loadVessels())
  }

  getVessel(id: string): Observable<Vessel | undefined> {
    return this.store.select(selectVesselById(id))
  }

  createVessel(vessel: Vessel, portId: string): void {
    this.store.dispatch(addVessel({ vessel, portId }))
  }

  dockVessel(id: string): void {
    this.store.dispatch(dockVessel({ id }))
  }

  unDockVessel(id: string): void {
    this.store.dispatch(undockVessel({ id }))
  }

  editNextRoutes(vesselId: string, nextStops:Port[]): void {
    this.store.dispatch(editNextRoutes({ vesselId, nextStops }))
  }
}
