import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { iInvoiceresponse } from '../../../interfaces/iinvoiceresponse';
import { InvoiceStatusService } from '../../../services/invoice-status.service';
import { iInvoiceStatus } from '../../../interfaces/iinvoice-status';
import { iInvoiceupdaterequest } from '../../../interfaces/iinvoiceupdaterequest';
import { InvoiceService } from '../../../services/invoice.service';
import { iInvoice } from '../../../interfaces/iinvoice';
import { iInvoiceresponseforcustomer } from '../../../interfaces/iinvoiceresponseforcustomer';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrl: './update-invoice.component.scss',
})
export class UpdateInvoiceComponent {
  constructor(
    private activeModal: NgbActiveModal,
    private statusSvc: InvoiceStatusService,
    private invoceSvc: InvoiceService
  ) {}

  statuses: iInvoiceStatus[] = [];

  @Input() invoice!: iInvoiceresponse | iInvoiceresponseforcustomer;

  message!: string;

  invoiceUpdate: iInvoiceupdaterequest = {
    status: '',
    notes: '',
  };

  ngOnInit() {
    this.statusSvc.getAll().subscribe((res) => (this.statuses = res));
  }

  updateInvoice() {
    this.invoceSvc
      .updateStatus(this.invoice!.number, this.invoiceUpdate)
      .subscribe((res) => {
        this.message = 'Invoice updated successfully';
        setTimeout(() => {
          this.activeModal.close(res);
        }, 1000);
      });
  }

  clearMessage() {
    this.message = '';
  }
}
