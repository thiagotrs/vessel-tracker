import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Stop, Vessel } from 'src/app/core/models/vessel.model';
import { addStop, cleanAlertMessage, loadVesselById, removeStop, saveRoutes, selectRoutePlanAlertMessage, selectRoutePlanCurrentStop, selectRoutePlanError, selectRoutePlanIsUnsaved, selectRoutePlanLoading, selectRoutePlanNextStops, selectRoutePlanVessel, setAlertMessage } from '../state/route-plan.state';

@Injectable()
export class RoutePlanService {

  selectedVessel$: Observable<Vessel | null>
  nextStops$: Observable<Port[]>
  currentStop$: Observable<Stop | null>
  isLoading$: Observable<boolean>
  isUnsaved$: Observable<boolean>
  error$: Observable<string | null>
  alertMessage$: Observable<string | null>

  constructor(private store: Store) {
    this.selectedVessel$ = this.store.select(selectRoutePlanVessel)
    this.nextStops$ = this.store.select(selectRoutePlanNextStops)
    this.currentStop$ = this.store.select(selectRoutePlanCurrentStop)
    this.isLoading$ = this.store.select(selectRoutePlanLoading)
    this.isUnsaved$ = this.store.select(selectRoutePlanIsUnsaved)
    this.error$ = this.store.select(selectRoutePlanError)
    this.alertMessage$ = this.store.select(selectRoutePlanAlertMessage)
  }


  loadVesselById(id: string): void {
    this.store.dispatch(loadVesselById({ vesselId: id }))
  }

  addStop(port: Port): void {
    this.store.dispatch(addStop({ port }))
  }

  removeStop(index: number): void {
    this.store.dispatch(removeStop({ index }))
  }

  saveRoutes(vesselId: string, nextStops:Port[]): void {
    this.store.dispatch(saveRoutes({ vesselId, nextStops }))
  }

  setAlertMessage(message: string): void {
    this.store.dispatch(setAlertMessage({ message }))
  }

  cleanAlertMessage(): void {
    this.store.dispatch(cleanAlertMessage())
  }

}
