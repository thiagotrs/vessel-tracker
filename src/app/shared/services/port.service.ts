import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Port } from 'src/app/core/models/port.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PortService implements OnDestroy {
  private _ports$ = new BehaviorSubject<Port[]>([]);
  private _error$ = new BehaviorSubject<boolean | null>(null);

  private subs = new Subscription();

  get ports$() {
    return this._ports$.asObservable();
  }

  get portError$() {
    return this._error$.asObservable();
  }

  constructor(private router: Router, private apiService: ApiService) {}

  loadPorts(): void {
    this.subs.add(
      this.ports$
        .pipe(
          mergeMap((ports) => {
            if (ports.length) return EMPTY;
            return this.apiService.getPorts();
          })
        )
        .subscribe((ports) => this._ports$.next(ports))
    );
  }

  createPort(port: Port): void {
    this.subs.add(
      this.apiService.addPort(port).subscribe({
        next: (port) => this._ports$.next([...this._ports$.value, port]),
        error: (err) => this._error$.next(err),
        complete: () => this.router.navigate(['/port'])
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
