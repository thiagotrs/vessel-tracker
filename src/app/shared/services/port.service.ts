import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Vessel } from 'src/app/core/models/vessel.model';
import { environment } from '../../../environments/environment';
import { addPort, loadPorts, selectPorts, selectPortsError } from '../store/port.state';

@Injectable({
  providedIn: 'root'
})
export class PortService {

  ports$: Observable<Port[]>
  portError$: Observable<string | null>

  constructor(private store: Store) {
    this.ports$ = this.store.select(selectPorts)
    this.portError$ = this.store.select(selectPortsError)
  }

  loadPorts(): void {
    this.store.dispatch(loadPorts())
  }

  createPort(port: Port): void {
    this.store.dispatch(addPort({ port }))
  }
}
