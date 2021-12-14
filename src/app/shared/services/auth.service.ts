import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { login, logout, selectAuthError, selectIsAuth, selectUser, signup } from '../store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>
  isAuth$: Observable<boolean>
  authError$: Observable<string | null>

  constructor(
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser)
    this.isAuth$ = this.store.select(selectIsAuth)
    this.authError$ = this.store.select(selectAuthError)
  }

  login({ email, pass }: { email: string, pass: string }): void {
    this.store.dispatch(login({ payload: { email, pass } }))
  }

  logout(): void {
    this.store.dispatch(logout())
  }

  signup({ name, email, pass }: { name: string, email: string, pass: string }): void {
    this.store.dispatch(signup({ payload: { name, email, pass } }))
  }
}
