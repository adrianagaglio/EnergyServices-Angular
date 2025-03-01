import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceStatusService } from '../../../../services/invoice-status.service';
import { iInvoiceStatus } from '../../../../interfaces/iinvoice-status';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-status',
  templateUrl: './invoice-status.component.html',
  styleUrl: './invoice-status.component.scss',
})
export class InvoiceStatusComponent {
  constructor(
    private activeModal: NgbActiveModal,
    private statusSvc: InvoiceStatusService
  ) {}

  @ViewChild('form') form!: NgForm;

  name: string = '';
  description: string = '';

  message!: string;

  save() {
    if (this.form.valid) {
      this.name = this.form.controls['name'].value.toUpperCase();
      this.statusSvc.create(this.form.value).subscribe((res) => {
        this.message = 'Invoice status created successfully';
        setTimeout(() => {
          this.activeModal.close(res);
        }, 1000);
      });
    }
  }

  clearMessage() {
    this.message = '';
  }
}
