import { Component, Input, ViewChild } from '@angular/core';
import { InvoiceService } from '../../../../services/invoice.service';
import { iInvoiceresponse } from '../../../../interfaces/iinvoiceresponse';
import { iInvoiceresponseforcustomer } from '../../../../interfaces/iinvoiceresponseforcustomer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-by-amount',
  templateUrl: './search-by-amount.component.html',
  styleUrl: './search-by-amount.component.scss',
})
export class SearchByAmountComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private activeModal: NgbActiveModal
  ) {}

  @ViewChild('form') form!: NgForm;

  min: string = '';
  max: string = '';

  invoices: iInvoiceresponse[] | iInvoiceresponseforcustomer[] = [];
  isLoading!: boolean;

  getAllByAmountRange(min: number, max: number) {
    this.isLoading = true;
    if (this.form.valid) {
      this.invoiceSvc.getAllByAmountRange(min, max).subscribe((res) => {
        this.invoices = res;
        this.activeModal.close(this.invoices);
      });
    } else {
      alert('Amount fields are required');
    }
  }
}
