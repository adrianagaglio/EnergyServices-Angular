import { RegisterComponent } from './../../../../auth/register/register.component';
import { Component, Input, ViewChild } from '@angular/core';
import { iInvoiceresponseforcustomer } from '../../../../interfaces/iinvoiceresponseforcustomer';
import { iInvoiceresponse } from '../../../../interfaces/iinvoiceresponse';
import { InvoiceService } from '../../../../services/invoice.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { iInvoiceStatus } from '../../../../interfaces/iinvoice-status';
import { InvoiceStatusService } from '../../../../services/invoice-status.service';

@Component({
  selector: 'app-search-by-status',
  templateUrl: './search-by-status.component.html',
  styleUrl: './search-by-status.component.scss',
})
export class SearchByStatusComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private activeModal: NgbActiveModal,
    private statusSvc: InvoiceStatusService
  ) {}

  statuses: iInvoiceStatus[] = [];
  status: string = '';

  isLoading!: boolean;

  ngOnInit() {
    this.statusSvc.getAll().subscribe((res) => (this.statuses = res));
  }
  invoices: iInvoiceresponse[] | iInvoiceresponseforcustomer[] = [];
  getAllByStatus() {
    this.isLoading = true;
    if (this.status == '') {
      alert('Select an invoice status to search');
    } else {
      this.invoiceSvc.getAllByStatus(this.status).subscribe((res) => {
        this.invoices = res;
        this.activeModal.close(this.invoices);
      });
    }
  }
}
