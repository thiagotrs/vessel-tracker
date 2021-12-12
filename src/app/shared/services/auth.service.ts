import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User | null>(null)
  private _isAuth = new BehaviorSubject<boolean>(false)

  constructor() { }

  get user$(): Observable<User | null> {
    return this._user.asObservable()
  }

  get isAuth$(): Observable<boolean> {
    return this._isAuth.asObservable()
  }

  login({ email, pass }: { email: string, pass: string }):Observable<never> {
    if (email === "admin@admin.com" && pass === "12345") {
      this._user.next({
        name: "Admin",
        email: "admin@admin.com"
      })
      this._isAuth.next(true)
      return EMPTY
    }
    return throwError("Incorrect email and/or password!")
  }

  logout():Observable<never> {
    this._user.next(null)
    this._isAuth.next(false)
    return EMPTY
  }

  signup({ name, email, pass }: { name: string, email: string, pass: string }):Observable<never> {
    this._user.next({ name, email })
    this._isAuth.next(true)
    return EMPTY
  }
}
