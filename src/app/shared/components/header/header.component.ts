import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    '.active-button {color: rgba(var(--bs-secondary-rgb),var(--bs-text-opacity))!important;}'
  ]
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>

  constructor(private authService: AuthService) {
    this.isAuth$ = this.authService.isAuth$
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
