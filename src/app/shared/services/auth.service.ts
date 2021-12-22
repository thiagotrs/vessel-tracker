import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, of, Subscription, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _user = new BehaviorSubject<User | null>(null)
  private _isAuth = new BehaviorSubject<boolean>(false)
  private _error = new BehaviorSubject<string | null>(null)

  private subs = new Subscription()

  constructor(private router: Router) { }

  get user$(): Observable<User | null> {
    return this._user.asObservable()
  }

  get isAuth$(): Observable<boolean> {
    return this._isAuth.asObservable()
  }

  get authError$(): Observable<string | null> {
    return this._error.asObservable()
  }

  private fakeLogin({ email, pass }: { email: string, pass: string }): Observable<User> {
    if (email !== "admin@admin.com" || pass !== "12345") {
      return throwError("Incorrect email and/or password!")
    }
    const user: User = { name: "Admin", email: "admin@admin.com" }
    return of(user)
  }

  private fakeSignup({ name, email, pass }: { name: string, email: string, pass: string }): Observable<User> {
    if (email === "admin@admin.com") {
      return throwError("User is already exists!")
    }
    const user: User = { name, email }
    return of(user)
  }

  login({ email, pass }: { email: string, pass: string }): void {
    this.subs.add(
      this.fakeLogin({ email, pass }).subscribe({
        next: user => {
          this._user.next(user)
          this._isAuth.next(true)
          this._error.next(null)
        },
        complete: () => this.router.navigate(["/home"]),
        error: err => this._error.next(err)
      })
    )
  }

  logout():void {
    this._user.next(null)
    this._isAuth.next(false)
    this._error.next(null)
    this.router.navigate(["/"])
  }

  signup({ name, email, pass }: { name: string, email: string, pass: string }): void {
    this.subs.add(this.fakeSignup({ name, email, pass }).subscribe({
      next: user => {
        this._user.next(user)
        this._isAuth.next(true)
        this._error.next(null)
      },
      complete: () => this.router.navigate(["/home"]),
      error: err => { this._error.next(err) }
    }))
  }

  cleanError(): void {
    this._error.next(null)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
