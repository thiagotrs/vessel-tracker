import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselHeroComponent } from './vessel-hero.component';
import { HeroModule } from '../hero/hero.module';
import { BadgeModule } from '../badge/badge.module';



@NgModule({
  declarations: [VesselHeroComponent],
  imports: [
    CommonModule,
    HeroModule,
    BadgeModule
  ],
  exports: [
    VesselHeroComponent
  ]
})
export class VesselHeroModule { }
