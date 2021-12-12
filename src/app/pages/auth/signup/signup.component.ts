import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent implements OnInit, OnDestroy {

  alertMessage: string = ''

  private signupSub?:Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(myForm: NgForm) {
    const signup = { name: myForm.form.value.name, email: myForm.form.value.email, pass: myForm.form.value.pass }
    this.signupSub = this.authService.signup(signup).subscribe({
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
    this.signupSub?.unsubscribe()
  }

}
