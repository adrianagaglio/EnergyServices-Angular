import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceStatusService } from '../../services/invoice-status.service';
import { CustomerService } from '../../services/customer.service';
import { iCustomer } from '../../interfaces/icustomer';
import { iInvoiceStatus } from '../../interfaces/iinvoice-status';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iInvoicerequest } from '../../interfaces/iinvoicerequest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceStatusComponent } from './components/invoice-status/invoice-status.component';
import { DecodeTokenService } from '../../services/decode-token.service';
import { AuthsrvService } from '../../auth/authsrv.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent {
  constructor(
    private invoceSvc: InvoiceService,
    private statusSvc: InvoiceStatusService,
    private customerSvc: CustomerService,
    private fb: FormBuilder,
    private decodeToken: DecodeTokenService,
    private authSvc: AuthsrvService
  ) {
    if (
      this.authSvc.userAuthSubject$ &&
      !this.decodeToken.userRoles$.getValue().includes('CUSTOMER')
    ) {
      this.customerSvc.getAll().subscribe();
    }
  }
  private modalService = inject(NgbModal);

  customers: iCustomer[] = [];
  newInvoice!: FormGroup;
  statuses: iInvoiceStatus[] = [];

  alertMessage!: string;

  ngOnInit() {
    this.customerSvc.customers$.subscribe((res) => (this.customers = res));
    this.statusSvc.getAll().subscribe((res) => (this.statuses = res));

    this.newInvoice = this.fb.group({
      date: this.fb.control('', [Validators.required]),
      amount: this.fb.control(0, [Validators.required, Validators.min(1)]),
      status: this.fb.control('', [Validators.required]),
      customerId: this.fb.control('', [Validators.required]),
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.newInvoice.get(field)?.touched && this.newInvoice.get(field)?.invalid
    );
  }

  keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      let vatCode = (event.target as HTMLInputElement).value;
      this.searchByVatCode(vatCode);
    }
  }

  searchByVatCode(vatCode: string) {
    this.customerSvc.getCustomerByVatCode(vatCode).subscribe((res) => {
      this.newInvoice.get('customerId')?.setValue(res.id);
    });
  }

  clean() {
    this.newInvoice.get('customerId')?.reset();
  }

  message(field: string) {
    if (this.newInvoice.get(field)?.hasError('required')) {
      return 'Field is required';
    } else if (this.newInvoice.get(field)?.hasError('min')) {
      return 'Amount must be greater than 0';
    } else {
      return '';
    }
  }

  save() {
    if (this.newInvoice.valid) {
      this.invoceSvc.create(this.newInvoice.value).subscribe((res) => {
        this.alertMessage = 'Invoice created successfully';
      });
    }
  }

  openModal() {
    const modalRef = this.modalService.open(InvoiceStatusComponent, {
      size: 'xl',
    });

    modalRef.result.then((res) => {
      this.statuses.push(res);
      this.statuses.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  clearMessage() {
    this.alertMessage = '';
  }
}
