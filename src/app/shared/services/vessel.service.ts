import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { Port } from 'src/app/core/models/port.model';
import { Status, Vessel } from 'src/app/core/models/vessel.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VesselService implements OnDestroy {

  private _vessels$ = new BehaviorSubject<Vessel[]>([])
  private _error$ = new BehaviorSubject<string | null>(null)
  private _selectedVessel$ = new BehaviorSubject<Vessel | undefined>(undefined)
  private _isLoading$ = new BehaviorSubject<boolean>(false)

  private subs = new Subscription()

  get vessels$() {
    return this._vessels$.asObservable()
  }

  get vesselError$() {
    return this._error$.asObservable()
  }

  get selectedVessel$() {
    return this._selectedVessel$.asObservable()
  }

  get isLoading$() {
    return this._isLoading$.asObservable()
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  private getVessels(): Observable<Vessel[]> {
    return this.httpClient.get<{vessels:Vessel[], ports:Port[]}>(environment.apiURL).pipe(
      map(value => value.vessels)
    )
  }

  private uuid() {
    const fn = () => (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return(fn() + fn() + "-" + fn() + "-3" + fn().slice(2) + "-" + fn() + "-" + fn() + fn() + fn()).toLowerCase();
  }

  private getPortById(id: string): Observable<Port | undefined> {
    return this.httpClient.get<{vessels:Vessel[],ports:Port[]}>(environment.apiURL).pipe(
      map(value => value.ports.find(port => port.id === id))
    )
  }

  private addVessel(vessel: Vessel, portId: string): Observable<Vessel> {
    return this.getPortById(portId).pipe(
      map(port => {
        if(port === undefined) {
          throw new Error('Invalid ID')
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

  private getVessel(id: string): Observable<Vessel | undefined> {
    return this.vessels$.pipe(
      take(1),
      map(vessels => vessels.find(v => v.id === id)),
      mergeMap(vessel => {
        if(vessel === undefined) {
          this._isLoading$.next(true)
          return this.httpClient.get<{vessels:Vessel[], ports:Port[]}>(environment.apiURL).pipe(
            tap(() => this._isLoading$.next(false)),
            map(value => {
              const vessel = value.vessels.find(v => v.id === id)
              if(vessel === undefined) throw new Error('Invalid ID')
              return vessel as Vessel
            })
          )
        }
        return of(vessel)
      })
    )
  }

  private dockVesselAux(id: string): Observable<Vessel> {
    return this.getVessel(id).pipe(
      map(vessel => {
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
  
  private undockVesselAux(id: string):Observable<Vessel> {
    return this.getVessel(id).pipe(
      map(vessel => {
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

  private editNextRoutesAux(vesselId: string, nextStops:Port[]):Observable<Vessel> {
    return this.getVessel(vesselId).pipe(
      map(vessel => {
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

  private getVesselById(vesselId: string): Observable<Vessel> {
    return this.vessels$.pipe(
      map(vessels => vessels.find(v => v.id === vesselId)),
      mergeMap(vessel => {
        if(vessel === undefined) {
          this._isLoading$.next(true)
          return this.httpClient.get<{vessels:Vessel[], ports:Port[]}>(environment.apiURL).pipe(
            tap(() => this._isLoading$.next(false)),
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

  loadVessels(): void {
    this.subs.add(
      this.vessels$.pipe(
        mergeMap((vessels) => {
          if(vessels.length) return EMPTY
          return this.getVessels()
        })
      ).subscribe(vessels => this._vessels$.next(vessels))
    )
  }

  loadVesselById(id: string): void {
    this.subs.add(
      this.getVesselById(id).subscribe({
        next: vessel => this._selectedVessel$.next(vessel),
        error: () => this.router.navigate(['/not-found'])
      })
    )
  }

  createVessel(vessel: Vessel, portId: string): void {
    this.subs.add(
      this.addVessel(vessel, portId).subscribe({
        next: vessel => this._vessels$.next([...this._vessels$.value, vessel]),
        error: err => this._error$.next(err),
        complete: () => this.router.navigate(['/vessel'])
      })
    )
  }

  dockVessel(id: string): void {
    this.subs.add(
      this.dockVesselAux(id).subscribe({
        next: vessel => this._vessels$.next(this._vessels$.value.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)),
        error: err => this._error$.next(err)
      })
    )
  }

  unDockVessel(id: string): void {
    this.subs.add(
      this.undockVesselAux(id).subscribe({
        next: vessel => this._vessels$.next(this._vessels$.value.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)),
        error: err => this._error$.next(err)
      })
    )
  }

  editNextRoutes(vesselId: string, nextStops:Port[]): void {
    this.subs.add(
      this.editNextRoutesAux(vesselId, nextStops).subscribe({
        next: vessel => this._vessels$.next(this._vessels$.value.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)),
        error: err => this._error$.next(err),
        complete: () => this.router.navigate(['/route-plan'])
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
