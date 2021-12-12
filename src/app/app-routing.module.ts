import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'route-plan', 
    loadChildren: () => import('./pages/route-plan/route-plan.module').then(m => m.RoutePlanModule),
    canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
