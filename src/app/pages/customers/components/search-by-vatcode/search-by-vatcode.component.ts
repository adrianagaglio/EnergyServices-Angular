import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iCustomer } from '../../../../interfaces/icustomer';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-search-by-vatcode',
  templateUrl: './search-by-vatcode.component.html',
  styleUrl: './search-by-vatcode.component.scss',
})
export class SearchByVatcodeComponent {
  constructor(private modalService: NgbModal) {}

  private customerSvc = inject(CustomerService);
  private activeModal = inject(NgbActiveModal);

  customers: iCustomer[] = [];
  isLoading!: boolean;

  getByVatCode(vatCode: string) {
    this.isLoading = true;
    this.customerSvc.getCustomerByVatCode(vatCode).subscribe({
      next: (res) => {
        this.customers.push(res);
        this.activeModal.close(this.customers);
      },
      error: (err) => {
        this.activeModal.close([]);
        setTimeout(() => {
          this.modalService.dismissAll();
        }, 500);
      },
    });
  }
}
