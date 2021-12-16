import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { Port } from 'src/app/core/models/port.model';
import { Status, Vessel } from 'src/app/core/models/vessel.model';
import { environment } from 'src/environments/environment';
import { selectPortById } from './port.state';
import { addVessel, addVesselFailure, addVesselSuccess, dockVessel, dockVesselFailure, dockVesselSuccess, editNextRoutes, editNextRoutesFailure, editNextRoutesSuccess, loadVessels, loadVesselsFailure, loadVesselsSuccess, selectVesselById, selectVessels, undockVessel, undockVesselFailure, undockVesselSuccess } from './vessel.state';

@Injectable()
export class VesselEffectsService {

  private getVessels(): Observable<Vessel[]> {
    return this.httpClient.get<{vessels:Vessel[],ports:Port[]}>(environment.apiURL).pipe(
      map(value => value.vessels)
    )
  }

  private uuid() {
    const fn = () => (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return(fn() + fn() + "-" + fn() + "-3" + fn().slice(2) + "-" + fn() + "-" + fn() + fn() + fn()).toLowerCase();
  }

  private addVessel(vessel: Vessel, portId: string): Observable<Vessel> {
    return this.store.select(selectPortById(portId)).pipe(
      take(1),
      map(port => {
        if(port === undefined) {
          new Error('Invalid ID')
        }
        const newVessel: Vessel = { 
          ...vessel, 
          id: this.uuid(), 
          status: Status.PARKED, 
          nextStops: [{ port: (port as Port), dateIn: new Date() }], 
          stops: [] 
        }

        return newVessel
      })
    )
  }

  private dockVessel(id: string): Observable<Vessel> {
    return this.store.select(selectVesselById(id)).pipe(
      take(1),
      map(vessel => {
        if(vessel === undefined) {
          new Error('Invalid ID')
        }

        const updatedVessel: Vessel = { 
          ...(vessel as Vessel), 
          status: Status.PARKED,
          nextStops: (vessel as Vessel).nextStops.length > 1 
          ? [{ ...(vessel as Vessel).nextStops[0], dateIn: new Date() }, ...(vessel as Vessel).nextStops.slice(1)] 
          : [{ ...(vessel as Vessel).nextStops[0], dateIn: new Date() }]
        }

        return updatedVessel
      })
    )
  }
  
  private undockVessel(id: string):Observable<Vessel> {
    return this.store.select(selectVesselById(id)).pipe(
      take(1),
      map(vessel => {
        if(vessel === undefined) {
          new Error('Invalid ID')
        }

        const updatedVessel: Vessel = {
          ...(vessel as Vessel),
          status: Status.SAILING,
          stops: (vessel as Vessel).stops.concat({ ...(vessel as Vessel).nextStops[0], dateOut: new Date() }),
          nextStops: (vessel as Vessel).nextStops.length > 1 ? (vessel as Vessel).nextStops.slice(1) : []
        }

        return updatedVessel
      })
    )
  }

  private editNextRoutes(vesselId: string, nextStops:Port[]):Observable<Vessel> {
    return this.store.select(selectVesselById(vesselId)).pipe(
      take(1),
      map(vessel => {
        if(vessel === undefined) {
          new Error('Invalid ID')
        }

        const updatedVessel: Vessel = {
          ...(vessel as Vessel),
          nextStops: [
            ...(vessel as Vessel).nextStops.filter(stop => stop.dateIn), 
            ...nextStops.map(port => ({ port }))
          ]
        }

        return updatedVessel
      })
    )
  }

  loadVessels$ = createEffect(() => this.actions$.pipe(
    ofType(loadVessels),
    withLatestFrom(this.store.select(selectVessels)),
    mergeMap(([_, vessels]) => {
      if(vessels.length) {
        return EMPTY
      }
      return this.getVessels().pipe(
        map((vessels: Vessel[]) => loadVesselsSuccess({ vessels })),
        catchError(error => of(loadVesselsFailure({ error })))
      )
    })
  ))

  addVessel$ = createEffect(() => this.actions$.pipe(
    ofType(addVessel),
    mergeMap(({ vessel, portId }) => this.addVessel(vessel, portId).pipe(
      map((vessel: Vessel) => addVesselSuccess({ vessel })),
      catchError(error => of(addVesselFailure({ error })))
    ))
  ))

  dockVessel$ = createEffect(() => this.actions$.pipe(
    ofType(dockVessel),
    mergeMap(({ id }) => this.dockVessel(id).pipe(
      map((vessel: Vessel) => dockVesselSuccess({ vessel })),
      catchError(error => of(dockVesselFailure({ error })))
    ))
  ))

  undockVessel$ = createEffect(() => this.actions$.pipe(
    ofType(undockVessel),
    mergeMap(({ id }) => this.undockVessel(id).pipe(
      map((vessel: Vessel) => undockVesselSuccess({ vessel })),
      catchError(error => of(undockVesselFailure({ error })))
    ))
  ))

  editNextRoutes$ = createEffect(() => this.actions$.pipe(
    ofType(editNextRoutes),
    mergeMap(({ vesselId, nextStops }) => this.editNextRoutes(vesselId, nextStops).pipe(
      map((vessel: Vessel) => editNextRoutesSuccess({ vessel })),
      catchError(error => of(editNextRoutesFailure({ error })))
    ))
  ))

  addVesselSuccessNavigate$ = createEffect(() => this.actions$.pipe(
    ofType(addVesselSuccess),
    tap(() => this.router.navigate(['/vessel']))
  ), { dispatch: false });

  editNextRoutesSuccessNavigate$ = createEffect(() => this.actions$.pipe(
    ofType(editNextRoutesSuccess),
    tap(() => this.router.navigate(['/route-plan']))
  ), { dispatch: false });

  constructor(private store: Store,
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) { }
}
