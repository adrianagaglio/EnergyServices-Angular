import { Component, inject, Input } from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../../services/invoice.service';
import { iInvoiceresponse } from '../../../../interfaces/iinvoiceresponse';
import { iInvoiceresponseforcustomer } from '../../../../interfaces/iinvoiceresponseforcustomer';

@Component({
  selector: 'app-search-by-number',
  templateUrl: './search-by-number.component.html',
  styleUrl: './search-by-number.component.scss',
})
export class SearchByNumberComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  invoices: iInvoiceresponse[] | iInvoiceresponseforcustomer[] = [];

  isLoading!: boolean;

  getByNumber(number: number) {
    this.isLoading = true;
    this.invoiceSvc.getByNumber(number).subscribe({
      next: (res) => {
        this.invoices.push(res);
        this.activeModal.close(this.invoices);
      },
      error: (error) => {
        this.activeModal.close([]);
        setTimeout(() => {
          this.modalService.dismissAll();
        }, 500);
      },
    });
  }
}
