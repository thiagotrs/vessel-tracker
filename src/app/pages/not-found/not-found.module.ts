import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { RouterModule, Routes } from '@angular/router';

const notFoundRoutes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ButtonModule,
    RouterModule.forChild(notFoundRoutes)
  ]
})
export class NotFoundModule { }
