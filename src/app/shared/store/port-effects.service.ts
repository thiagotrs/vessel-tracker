import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, merge, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Port } from 'src/app/core/models/port.model';
import { Vessel } from 'src/app/core/models/vessel.model';
import { environment } from 'src/environments/environment';
import { addPort, addPortFailure, addPortSuccess, loadPorts, loadPortsFailure, loadPortsSuccess, selectPorts } from './port.state';

@Injectable()
export class PortEffectsService {

  private getPorts(): Observable<Port[]> {
    return this.httpClient.get<{vessels:Vessel[],ports:Port[]}>(environment.apiURL).pipe(
      tap(v => console.log(v)),
      map(value => value.ports)
    )
  }

  private uuid() {
    const fn = () => (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return(fn() + fn() + "-" + fn() + "-3" + fn().slice(2) + "-" + fn() + "-" + fn() + fn() + fn()).toLowerCase();
  }

  private addPort(port: Port): Observable<Port> {
    const portWithId = { ...port, id: this.uuid() }
    return of(portWithId)
  }

  loadPorts$ = createEffect(() => this.actions$.pipe(
    ofType(loadPorts),
    withLatestFrom(this.store.select(selectPorts)),
    mergeMap(([_, ports]) => {
      if(ports.length) {
        return EMPTY
      }
      return this.getPorts().pipe(
        map((ports: Port[]) => loadPortsSuccess({ ports })),
        catchError(error => of(loadPortsFailure({ error })))
      )
    })
  ))

  addPort$ = createEffect(() => this.actions$.pipe(
    ofType(addPort),
    mergeMap(({ port }) => this.addPort(port).pipe(
      map((port: Port) => addPortSuccess({ port })),
      catchError(error => of(addPortFailure({ error })))
    ))
  ))
  
  addPortSuccessNavigate$ = createEffect(() => this.actions$.pipe(
    ofType(addPortSuccess),
    tap(() => this.router.navigate(['/port']))
  ), { dispatch: false });

  constructor(
    private store: Store,
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) { }
}
