import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Vessel } from 'src/app/core/models/vessel.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortService {

  private _ports$ = new BehaviorSubject<Port[]>([])

  private get ports$() {
    return this._ports$.asObservable()
  }

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<{vessels:Vessel[],ports:Port[]}>(environment.apiURL).subscribe(data => {
      this._ports$.next([...data.ports]);
    })
  }

  getPorts(): Observable<Port[]> {
    return this.ports$
  }

  createPort(port: Port):Observable<never> {
    this._ports$.next([...this._ports$.value, {...port, id: `v${this._ports$.value.length}`}])
    return EMPTY
  }
}
