import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent {
  alertMessage$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.alertMessage$ = this.authService.authError$;
  }

  onSubmit(myForm: NgForm) {
    const signup = {
      name: myForm.form.value.name,
      email: myForm.form.value.email,
      pass: myForm.form.value.pass
    };
    this.authService.signup(signup);
  }

  closeAlert() {
    this.authService.cleanError();
  }
}
