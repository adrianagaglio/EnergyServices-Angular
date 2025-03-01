import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { FormsModule } from '@angular/forms';
import { SearchByCustomerComponent } from './components/search-by-customer/search-by-customer.component';
import { SearchByNumberComponent } from './components/search-by-number/search-by-number.component';
import { SearchByStatusComponent } from './components/search-by-status/search-by-status.component';
import { SearchByCustomerInfoComponent } from './components/search-by-customer-info/search-by-customer-info.component';
import { SearchByDateComponent } from './components/search-by-date/search-by-date.component';
import { SearchByYearComponent } from './components/search-by-year/search-by-year.component';
import { SearchByAmountComponent } from './components/search-by-amount/search-by-amount.component';
import { NgIconsModule } from '@ng-icons/core';
import { InvoiceCardModule } from '../../shared/invoice-card/invoice-card.module';

import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from '../../shared/alert/alert/alert.module';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    InvoicesComponent,
    SearchByCustomerComponent,
    SearchByNumberComponent,
    SearchByStatusComponent,
    SearchByCustomerInfoComponent,
    SearchByDateComponent,
    SearchByYearComponent,
    SearchByAmountComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    FormsModule,
    NgIconsModule,
    InvoiceCardModule,
    AlertModule,
  ],
})
export class InvoicesModule {}
