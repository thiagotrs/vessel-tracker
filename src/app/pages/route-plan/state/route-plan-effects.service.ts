import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, take, tap } from "rxjs/operators";
import { Port } from "src/app/core/models/port.model";
import { Vessel } from "src/app/core/models/vessel.model";
import { editNextRoutes, selectVesselById } from "src/app/shared/store/vessel.state";
import { environment } from "src/environments/environment";
import { loadVesselById, loadVesselByIdFailure, loadVesselByIdSuccess, saveRoutes } from "./route-plan.state";

@Injectable()
export class RoutePlanEffectsService {

  private getVesselById(vesselId: string): Observable<Vessel> {
    return this.store.select(selectVesselById(vesselId)).pipe(
      take(1),
      mergeMap(vessel => {
        if(vessel === undefined) {
          return this.httpClient.get<{vessels:Vessel[], ports:Port[]}>(environment.apiURL).pipe(
            map(value => {
              const vessel = value.vessels.find(v => v.id === vesselId)
              if(vessel === undefined) throw new Error('Invalid ID')
              return vessel as Vessel
            })
          )
        }
        return of(vessel)
      })
    )
  }

  loadVesselById$ = createEffect(() => this.actions$.pipe(
    ofType(loadVesselById),
    mergeMap(({ vesselId }) => this.getVesselById(vesselId).pipe(
      map((vessel: Vessel) => loadVesselByIdSuccess({ vessel })),
      catchError(error => {
        return of(loadVesselByIdFailure({ error }))
      })
    ))
  ))

  saveRoutes$ = createEffect(() => this.actions$.pipe(
    ofType(saveRoutes),
    map(({ vesselId, nextStops }) => editNextRoutes({ vesselId, nextStops }))
  ))

  loadVesselByIdNavigate$ = createEffect(() => this.actions$.pipe(
    ofType(loadVesselByIdFailure),
    tap(() => this.router.navigate(['/not-found']))
  ), { dispatch: false });

  constructor(
    private store: Store,
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) { }
}