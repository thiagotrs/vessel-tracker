import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselListComponent } from './vessel-list/vessel-list.component';
import { VesselAddComponent } from './vessel-add/vessel-add.component';
import { VesselDetailComponent } from './vessel-detail/vessel-detail.component';
import { VesselComponent } from './vessel.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { HeroModule } from 'src/app/shared/components/hero/hero.module';
import { FormsModule } from '@angular/forms';
import { ListGroupModule } from 'src/app/shared/components/list-group/list-group.module';
import { StopsListComponent } from './components/stops-list/stops-list.component';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { DockButtonComponent } from './components/dock-button/dock-button.component';
import { VesselsListModule } from 'src/app/shared/components/vessels-list/vessels-list.module';
import { VesselHeroModule } from 'src/app/shared/components/vessel-hero/vessel-hero.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';

const vesselRoutes: Routes = [
  {
    path: 'vessel',
    component: VesselComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: VesselListComponent,
      },
      {
        path: 'add',
        component: VesselAddComponent
      },
      {
        path: ':id',
        component: VesselDetailComponent,
      },
      { path: '**', redirectTo: '/home' }
    ]
  }
];

@NgModule({
  declarations: [
    VesselListComponent,
    VesselAddComponent,
    VesselDetailComponent,
    VesselComponent,
    StopsListComponent,
    DockButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(vesselRoutes),
    HeaderModule,
    HeroModule,
    ButtonModule,
    BadgeModule,
    FormsModule,
    ListGroupModule,
    ModalModule,
    VesselsListModule,
    VesselHeroModule,
    SpinnerModule
  ],
})
export class VesselModule { }
