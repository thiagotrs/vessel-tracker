import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  alertMessage: string = ''

  private authErrorSub: Subscription
  private isAuthSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authErrorSub = this.authService.authError$.subscribe(message => { this.alertMessage = message || '' })
    this.isAuthSub = this.authService.isAuth$.subscribe(flag => flag && this.router.navigate(["/home"]))
  }

  ngOnInit(): void {
  }

  onSubmit(myForm: NgForm) {
    const login = { email: myForm.form.value.email, pass: myForm.form.value.pass }
    this.authService.login(login)
  }

  closeAlert() {
    this.alertMessage = ''
  }

  ngOnDestroy():void {
    this.authErrorSub.unsubscribe()
    this.isAuthSub.unsubscribe()
  }

}
