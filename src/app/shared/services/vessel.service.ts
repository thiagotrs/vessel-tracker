import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, of, Subscription } from 'rxjs';
import { concatMap, map, mergeMap, take, tap } from 'rxjs/operators';
import { Port } from 'src/app/core/models/port.model';
import { Status, Vessel } from 'src/app/core/models/vessel.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VesselService implements OnDestroy {
  private _vessels$ = new BehaviorSubject<Vessel[]>([]);
  private _error$ = new BehaviorSubject<string | null>(null);
  private _selectedVessel$ = new BehaviorSubject<Vessel | undefined>(undefined);
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  private subs = new Subscription();

  get vessels$() {
    return this._vessels$.asObservable();
  }

  get vesselError$() {
    return this._error$.asObservable();
  }

  get selectedVessel$() {
    return this._selectedVessel$.asObservable();
  }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  constructor(private router: Router, private apiService: ApiService) {}

  loadVessels(): void {
    this.subs.add(
      this.vessels$
        .pipe(
          mergeMap((vessels) => {
            if (vessels.length) return EMPTY;
            return this.apiService.getVessels();
          })
        )
        .subscribe((vessels) => this._vessels$.next(vessels))
    );
  }

  loadVesselById(id: string): void {
    this.subs.add(
      this.vessels$
        .pipe(
          map((vessels) => vessels.find((v) => v.id === id)),
          mergeMap((vessel) => {
            if (vessel === undefined) {
              this._isLoading$.next(true);
              return this.apiService
                .getVessel(id)
                .pipe(tap(() => this._isLoading$.next(false)));
            }
            return of(vessel);
          })
        )
        .subscribe({
          next: (vessel) => this._selectedVessel$.next({ ...vessel }),
          error: () => this.router.navigate(['/not-found'])
        })
    );
  }

  createVessel(vessel: Vessel, portId: string): void {
    this.subs.add(
      this.apiService
        .addVessel({ ...vessel, status: Status.PARKED }, portId)
        .subscribe({
          next: (vessel) =>
            this._vessels$.next([...this._vessels$.value, vessel]),
          error: (err) => this._error$.next(err),
          complete: () => this.router.navigate(['/vessel'])
        })
    );
  }

  dockVessel(vesselId: string): void {
    this.subs.add(
      this.selectedVessel$
        .pipe(
          take(1),
          map((vessel) => {
            return {
              ...(vessel as Vessel),
              status: Status.PARKED,
              nextStops:
                (vessel as Vessel).nextStops.length > 1
                  ? [
                      {
                        ...(vessel as Vessel).nextStops[0],
                        dateIn: new Date()
                      },
                      ...(vessel as Vessel).nextStops.slice(1)
                    ]
                  : [{ ...(vessel as Vessel).nextStops[0], dateIn: new Date() }]
            } as Vessel;
          }),
          concatMap((updatedVessel) =>
            this.apiService
              .updateVessel(updatedVessel.nextStops[0], updatedVessel.id)
              .pipe(map(() => updatedVessel))
          )
        )
        .subscribe({
          next: (vessel) =>
            this._vessels$.next(
              this._vessels$.value.map((v) =>
                vessel.id === v.id ? { ...vessel } : v
              )
            ),
          error: (err) => this._error$.next(err)
        })
    );
  }

  unDockVessel(vesselId: string): void {
    this.subs.add(
      this.selectedVessel$
        .pipe(
          take(1),
          map((vessel) => {
            return {
              ...(vessel as Vessel),
              status: Status.SAILING,
              stops: (vessel as Vessel).stops.concat({
                ...(vessel as Vessel).nextStops[0],
                dateOut: new Date()
              }),
              nextStops:
                (vessel as Vessel).nextStops.length > 1
                  ? (vessel as Vessel).nextStops.slice(1)
                  : []
            } as Vessel;
          }),
          concatMap((updatedVessel) =>
            this.apiService
              .updateVessel(
                updatedVessel.stops[updatedVessel.stops.length - 1],
                updatedVessel.id
              )
              .pipe(map(() => updatedVessel))
          )
        )
        .subscribe({
          next: (vessel) =>
            this._vessels$.next(
              this._vessels$.value.map((v) =>
                vessel.id === v.id ? { ...vessel } : v
              )
            ),
          error: (err) => this._error$.next(err)
        })
    );
  }

  editNextRoutes(vesselId: string, nextStops: Port[]): void {
    this.subs.add(
      this.selectedVessel$
        .pipe(
          take(1),
          map((vessel) => {
            return {
              ...(vessel as Vessel),
              nextStops: [
                ...(vessel as Vessel).nextStops.filter((stop) => stop.dateIn),
                ...nextStops.map((port) => ({ port }))
              ]
            } as Vessel;
          }),
          concatMap((updatedVessels) =>
            this.apiService
              .updateAllStopsVessel(updatedVessels.nextStops, updatedVessels.id)
              .pipe(
                map(
                  (nextStops) =>
                    ({ ...updatedVessels, nextStops: [...nextStops] } as Vessel)
                )
              )
          )
        )
        .subscribe({
          next: (vessel) =>
            this._vessels$.next(
              this._vessels$.value.map((v) =>
                vesselId === v.id ? { ...vessel } : v
              )
            ),
          error: (err) => this._error$.next(err),
          complete: () => this.router.navigate(['/route-plan'])
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
