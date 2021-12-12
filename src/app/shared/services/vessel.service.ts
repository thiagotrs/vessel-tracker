import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Status, Vessel } from 'src/app/core/models/vessel.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  private _vessels$ = new BehaviorSubject<Vessel[]>([])

  private get vessels$() {
    return this._vessels$.asObservable()
  }

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<{vessels:Vessel[],ports:Port[]}>(environment.apiURL).subscribe(data => {
      this._vessels$.next([...data.vessels]);
    })
  }

  getVessels(): Observable<Vessel[]> {
    return this.vessels$
  }

  getVessel(id: string): Observable<Vessel> {
    const result = this._vessels$.value.find(v => v.id === id);
    if(!result) {
      return throwError('Invalid ID')
    }
    return of(result);
  }

  createVessel(vessel: Vessel, port: Port):Observable<never> {
    this._vessels$.next([
      ...this._vessels$.value, 
      {...vessel, id: `v${this._vessels$.value.length}`, status: Status.PARKED, nextStops: [{port, dateIn: new Date()}], stops: []}
    ])
    return EMPTY
  }

  dockVessel(id: string):Observable<Vessel> {
    const resultIndex = this._vessels$.value.findIndex(v => v.id === id);
    if (!resultIndex) {
      return throwError('Invalid ID')
    }
    const vessel = this._vessels$.value[resultIndex]
    vessel.nextStops[0].dateIn = new Date();
    vessel.status = Status.PARKED
    vessel.nextStops = [...vessel.nextStops]
    return of({...vessel})
  }

  unDockVessel(id: string):Observable<Vessel> {
    const resultIndex = this._vessels$.value.findIndex(v => v.id === id);
    if (!resultIndex) {
      return throwError('Invalid ID')
    }
    const vessel = this._vessels$.value[resultIndex]
    vessel.nextStops[0].dateOut = new Date();
    vessel.stops = [...vessel.stops, vessel.nextStops[0]]
    vessel.nextStops = vessel.nextStops.slice(1)
    vessel.status = Status.SAILING
    return of({...vessel})
  }

  editNextRoutes(vesselId: string, nextStops:Port[]):Observable<void> {
    const resultIndex = this._vessels$.value.findIndex(v => v.id === vesselId);
    if (!resultIndex) {
      return throwError('Invalid ID')
    }

    this._vessels$.value[resultIndex].nextStops = [
      ...this._vessels$.value[resultIndex].nextStops.filter(stop => stop.dateIn), 
      ...nextStops.map(port => ({port}))
    ]

    return EMPTY
  }
}
