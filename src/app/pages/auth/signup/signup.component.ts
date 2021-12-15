import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent implements OnInit {

  alertMessage$: Observable<string | null>

  constructor(private authService: AuthService) {
    this.alertMessage$ = this.authService.authError$.pipe(tap(v => console.log(v)))
  }

  ngOnInit(): void { }

  onSubmit(myForm: NgForm) {
    const signup = { name: myForm.form.value.name, email: myForm.form.value.email, pass: myForm.form.value.pass }
    this.authService.signup(signup)
  }

  closeAlert() {
    this.authService.cleanError()
  }

}
