import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../../../services/invoice.service';
import { iInvoiceresponse } from '../../../../interfaces/iinvoiceresponse';
import { iInvoiceresponseforcustomer } from '../../../../interfaces/iinvoiceresponseforcustomer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrl: './search-by-date.component.scss',
})
export class SearchByDateComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private activeModal: NgbActiveModal
  ) {}

  date: string = '';

  invoices: iInvoiceresponse[] | iInvoiceresponseforcustomer[] = [];
  isLoading!: boolean;

  getAllByDate(date: string) {
    this.isLoading = true;
    this.invoiceSvc.getAllByDate(date).subscribe((res) => {
      this.invoices = res;
      this.activeModal.close(this.invoices);
    });
  }
}
