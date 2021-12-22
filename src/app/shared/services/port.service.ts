import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Port } from 'src/app/core/models/port.model';
import { Vessel } from 'src/app/core/models/vessel.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortService implements OnDestroy {

  private _ports$ = new BehaviorSubject<Port[]>([])
  private _error$ = new BehaviorSubject<boolean | null>(null)

  private subs = new Subscription()

  get ports$() {
    return this._ports$.asObservable()
  }

  get portError$() {
    return this._error$.asObservable()
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  private getPorts(): Observable<Port[]> {
    return this.httpClient.get<{vessels:Vessel[], ports:Port[]}>(environment.apiURL).pipe(
      map(value => value.ports)
    )
  }

  private uuid() {
    const fn = () => (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return(fn() + fn() + "-" + fn() + "-3" + fn().slice(2) + "-" + fn() + "-" + fn() + fn() + fn()).toLowerCase();
  }

  private addPort(port: Port): Observable<Port> {
    return of({ ...port, id: this.uuid() })
  }

  loadPorts(): void {
    this.subs.add(
      this.ports$.pipe(
        mergeMap(ports => {
          if(ports.length) return EMPTY
          return this.getPorts()
        })
      ).subscribe(ports => this._ports$.next(ports))
    )
  }

  createPort(port: Port): void {
    this.subs.add(
      this.addPort(port).subscribe({
        next: port => this._ports$.next([...this._ports$.value, port]),
        error: err => this._error$.next(err),
        complete: () => this.router.navigate(['/port'])
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
