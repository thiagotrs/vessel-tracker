import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortComponent } from './port.component';
import { RouterModule, Routes } from '@angular/router';
import { PortListComponent } from './port-list/port-list.component';
import { PortsListComponent } from './components/ports-list/ports-list.component';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ListGroupModule } from 'src/app/shared/components/list-group/list-group.module';
import { PortAddComponent } from './port-add/port-add.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

const portRoutes: Routes = [
  {
    path: 'port',
    component: PortComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PortListComponent
      },
      {
        path: 'add',
        component: PortAddComponent
      },
      { path: '**', redirectTo: '/home' }
    ]
  }
];

@NgModule({
  declarations: [
    PortComponent,
    PortListComponent,
    PortsListComponent,
    PortAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(portRoutes),
    FormsModule,
    HeaderModule,
    ListGroupModule,
    ButtonModule
  ]
})
export class PortModule {}
