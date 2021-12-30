import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { from, Observable } from 'rxjs';
import { concatAll, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

export interface CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return from([
      this.authService
        .autoLogin()
        .pipe(
          map((flag) => (flag ? this.router.createUrlTree(['/home']) : true))
        ),
      this.authService.isAuth$.pipe(
        take(1),
        map((isAuth) => {
          if (isAuth) return this.router.createUrlTree(['/home']);
          return true;
        })
      )
    ]).pipe(concatAll());
  }
}
