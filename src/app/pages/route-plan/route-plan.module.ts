import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutePlanComponent } from './route-plan.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { RoutePlanVesselsComponent } from './route-plan-vessels/route-plan-vessels.component';
import { RoutePlanAddComponent } from './route-plan-add/route-plan-add.component';
import { ListGroupModule } from 'src/app/shared/components/list-group/list-group.module';
import { HeroModule } from 'src/app/shared/components/hero/hero.module';
import { PortsListComponent } from './components/ports-list/ports-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { StopComponent } from './components/stop/stop.component';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';
import { VesselsListModule } from 'src/app/shared/components/vessels-list/vessels-list.module';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { VesselHeroModule } from 'src/app/shared/components/vessel-hero/vessel-hero.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

const routePlanRoutes:Routes = [
  {
    path: '',
    component: RoutePlanComponent,
    children: [
      {
        path: '',
        component: RoutePlanVesselsComponent
      },
      {
        path: ':id',
        component: RoutePlanAddComponent,
        canDeactivate: [AuthGuard]
      },
      { path: '**', redirectTo: '/home' }
    ]
  }
]

@NgModule({
  declarations: [
    RoutePlanComponent,
    RoutePlanVesselsComponent,
    RoutePlanAddComponent,
    PortsListComponent,
    StopComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routePlanRoutes),
    HeaderModule,
    HeroModule,
    FormsModule,
    ListGroupModule,
    AlertModule,
    BadgeModule,
    VesselsListModule,
    VesselHeroModule,
    ButtonModule
  ]
})
export class RoutePlanModule { }
