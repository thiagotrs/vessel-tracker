import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  private _isAuth = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | null>(null);

  private _isFirstLoading = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private apiService: ApiService) {}

  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  get isAuth$(): Observable<boolean> {
    return this._isAuth.asObservable();
  }

  get authError$(): Observable<string | null> {
    return this._error.asObservable();
  }

  autoLogin(): Observable<boolean> {
    return this._isFirstLoading.asObservable().pipe(
      mergeMap((flag) => {
        if (!flag) return of(true);
        return this.apiService.verifyUser().pipe(
          map((user) => {
            this._user.next(user);
            this._isAuth.next(true);
            this._error.next(null);
            this._isFirstLoading.next(false);
            return true;
          }),
          catchError(() => {
            this._isAuth.next(false);
            return of(false);
          })
        );
      })
    );
  }

  login({ email, pass }: { email: string; pass: string }): void {
    this.apiService.signIn({ email, pass }).subscribe({
      next: (user) => {
        this._user.next(user);
        this._isAuth.next(true);
        this._error.next(null);
      },
      complete: () => this.router.navigate(['/home']),
      error: (err) => this._error.next('Invalid credentials.')
    });
  }

  logout(): void {
    this.apiService.logout().subscribe(() => {
      this._user.next(null);
      this._isAuth.next(false);
      this._error.next(null);
      this.router.navigate(['/']);
    });
  }

  signup({
    name,
    email,
    pass
  }: {
    name: string;
    email: string;
    pass: string;
  }): void {
    this.apiService.signUp({ name, email, pass }).subscribe({
      next: (user) => {
        this._user.next(user);
        this._isAuth.next(true);
        this._error.next(null);
      },
      complete: () => this.router.navigate(['/home']),
      error: (err) => this._error.next('User already exists.')
    });
  }

  cleanError(): void {
    this._error.next(null);
  }
}
