import { iInvoiceresponseforcustomer } from './../../../../interfaces/iinvoiceresponseforcustomer';
import { Component, inject, Input } from '@angular/core';
import { iInvoiceresponse } from '../../../../interfaces/iinvoiceresponse';
import { InvoiceService } from '../../../../services/invoice.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-by-year',
  templateUrl: './search-by-year.component.html',
  styleUrl: './search-by-year.component.scss',
})
export class SearchByYearComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private activeModal: NgbActiveModal
  ) {}

  year: string = '';

  invoices: iInvoiceresponse[] | iInvoiceresponseforcustomer[] = [];
  isLoading!: boolean;
  getAllByYear(year: number) {
    this.isLoading = true;
    this.invoiceSvc.getAllByYear(year).subscribe((res) => {
      this.invoices = res;
      this.activeModal.close(this.invoices);
    });
  }
}
