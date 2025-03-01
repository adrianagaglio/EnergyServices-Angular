import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCardComponent } from './invoice-card.component';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { FormsModule } from '@angular/forms';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AlertModule } from '../alert/alert/alert.module';

@NgModule({
  declarations: [
    InvoiceCardComponent,
    UpdateInvoiceComponent,
    CustomerInfoComponent,
  ],
  imports: [CommonModule, FormsModule, AlertModule],
  exports: [InvoiceCardComponent],
})
export class InvoiceCardModule {}
