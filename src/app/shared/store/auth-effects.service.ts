import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess } from './auth.state';

@Injectable()
export class AuthEffectsService {

  private fakeLogin({ email, pass }: { email: string, pass: string }): Observable<User> {
    if (email !== "admin@admin.com" && pass !== "12345") {
      return throwError("Incorrect email and/or password!")
    }
    const user: User = { name: "Admin", email: "admin@admin.com" }
    return of(user)
  }

  private fakeSignup({ name, email, pass }: { name: string, email: string, pass: string }): Observable<User> {
    if (email === "admin@admin.com" && pass === "12345") {
      return throwError("User is already exists!")
    }
    const user: User = { name, email }
    return of(user)
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(({ payload: { email, pass } }) => this.fakeLogin({ email, pass })
      .pipe(
        map((user: User) => loginSuccess({ user })),
        catchError(error => of(loginFailure({ error })))
      )
    ),
    // switchMap(({ payload: { email, pass } }) => {
    //   if (email === "admin@admin.com" && pass === "12345") {
    //     const user: User = {
    //       name: "Admin",
    //       email: "admin@admin.com"
    //     }
    //     return of(user);
    //   }
    //   return throwError("Incorrect email and/or password!");
    // }),
    // map((user: User) => loginSuccess({ user })),
    // catchError((error) => of(loginFailure({ error })))
  ));

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(signup),
    mergeMap(({ payload: { name, email, pass } }) => this.fakeSignup({ name, email, pass })
      .pipe(
        map((user: User) => signupSuccess({ user })),
        catchError(error => of(signupFailure({ error })))
      )
    )
  ));

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }
}
