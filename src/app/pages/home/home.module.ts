import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InvoiceCardModule } from '../../shared/invoice-card/invoice-card.module';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    InvoiceCardModule,
    FormsModule,
    NgIconsModule,
  ],
})
export class HomeModule {}
