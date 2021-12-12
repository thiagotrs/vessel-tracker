import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { VesselModule } from './pages/vessel/vessel.module';
import { PortModule } from './pages/port/port.module';
import { AuthModule } from './pages/auth/auth.module';
import { LandingModule } from './pages/landing/landing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundModule } from './pages/not-found/not-found.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LandingModule,
    HomeModule,
    NotFoundModule,
    AuthModule,
    VesselModule,
    PortModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
