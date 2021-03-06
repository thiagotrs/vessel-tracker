import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { from, Observable } from 'rxjs';
import { concatAll, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard
  implements CanActivate, CanLoad, CanDeactivate<CanComponentDeactivate>
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.permit();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.permit();
  }

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate
      ? (component.canDeactivate() as Observable<boolean>)
      : true;
  }

  permit(): Observable<boolean | UrlTree> | boolean | UrlTree {
    return from([
      this.authService
        .autoLogin()
        .pipe(
          map((flag) => flag || this.router.createUrlTree(['/auth', 'login']))
        ),
      this.authService.isAuth$.pipe(
        take(1),
        map((isAuth) => {
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth', 'login']);
        })
      )
    ]).pipe(concatAll());
  }
}
