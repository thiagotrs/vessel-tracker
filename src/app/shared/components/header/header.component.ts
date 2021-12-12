import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    '.active-button {color: rgba(var(--bs-secondary-rgb),var(--bs-text-opacity))!important;}'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean = false

  private authSub!: Subscription
  private logoutSub?: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.isAuth$.subscribe(isAuth => {this.isAuth = isAuth})
  }

  logout() {
    this.logoutSub = this.authService.logout().subscribe({
      complete: () => this.router.navigate(["/auth", "login"])
    })
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
    this.logoutSub?.unsubscribe()
  }

}
