import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  alertMessage: string = ''

  private loginSub?: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(myForm: NgForm) {
    const login = { email: myForm.form.value.email, pass: myForm.form.value.pass }
    this.loginSub = this.authService.login(login).subscribe({
      complete: () => {
        this.router.navigate(["/home"])
      },
      error: err => {this.alertMessage = err}
    })
  }

  closeAlert() {
    this.alertMessage = ''
  }

  ngOnDestroy():void {
    this.loginSub?.unsubscribe()
  }

}
