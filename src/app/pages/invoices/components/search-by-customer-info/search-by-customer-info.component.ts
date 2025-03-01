import { CustomerService } from './../../../../services/customer.service';
import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../../../services/invoice.service';
import { iInvoiceresponse } from '../../../../interfaces/iinvoiceresponse';
import { iInvoiceresponseforcustomer } from '../../../../interfaces/iinvoiceresponseforcustomer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iCustomer } from '../../../../interfaces/icustomer';

@Component({
  selector: 'app-search-by-customer-info',
  templateUrl: './search-by-customer-info.component.html',
  styleUrl: './search-by-customer-info.component.scss',
})
export class SearchByCustomerInfoComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private activeModal: NgbActiveModal,
    private customerSvc: CustomerService
  ) {}

  invoices: iInvoiceresponse[] | iInvoiceresponseforcustomer[] = [];

  customerId: string = '';
  vatCode: string = '';
  pec: string = '';
  direction!: string;

  customerFromlocalStorageJSON: string | null = null;
  isChecked: boolean = false;
  customers: iCustomer[] = [];

  isLoading!: boolean;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.direction = 'DESC';
    } else {
      this.direction = 'ASC';
    }
  }

  ngOnInit() {
    this.customerFromlocalStorageJSON =
      sessionStorage.getItem('customerToInvoices');

    if (this.customerFromlocalStorageJSON) {
      const customerFromlocalStorage: iCustomer = JSON.parse(
        this.customerFromlocalStorageJSON
      );
      this.customerId = customerFromlocalStorage.id.toString();
      this.getAllByCustomerInfo();
      sessionStorage.removeItem('customerToInvoices');
    } else {
      this.customerSvc.customers$.subscribe((res) => (this.customers = res));
    }
  }

  getAllByCustomerInfo() {
    this.isLoading = true;
    if (
      (this.customerId == '' || this.customerId == undefined) &&
      this.vatCode == '' &&
      this.pec == ''
    ) {
      alert('At least one field is required');
    }
    if (this.customerId != '') {
      this.invoiceSvc
        .getAllByCustomerInfo(+this.customerId, this.direction)
        .subscribe((res) => {
          this.invoices = res;
          this.activeModal.close(this.invoices);
        });
    } else if (this.vatCode != '') {
      this.invoiceSvc
        .getAllByCustomerInfo(this.vatCode, this.direction)
        .subscribe((res) => {
          this.invoices = res;
          this.activeModal.close(this.invoices);
        });
    } else if (this.pec != '') {
      this.invoiceSvc
        .getAllByCustomerInfo(this.pec, this.direction)
        .subscribe((res) => {
          this.invoices = res;
          this.activeModal.close(this.invoices);
        });
    }
  }
}
