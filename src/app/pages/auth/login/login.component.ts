import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  alertMessage$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.alertMessage$ = this.authService.authError$;
  }

  onSubmit(myForm: NgForm) {
    const login = {
      email: myForm.form.value.email,
      pass: myForm.form.value.pass
    };
    this.authService.login(login);
  }

  closeAlert() {
    this.authService.cleanError();
  }
}
