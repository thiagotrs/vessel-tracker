import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { RouterModule } from '@angular/router';
import { HeroModule } from 'src/app/shared/components/hero/hero.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, HeaderModule, HeroModule, ButtonModule],
  exports: [HomeComponent]
})
export class HomeModule {}
