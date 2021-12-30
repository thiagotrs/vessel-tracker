import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ButtonModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
