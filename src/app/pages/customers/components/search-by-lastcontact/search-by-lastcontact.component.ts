import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iCustomer } from '../../../../interfaces/icustomer';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-search-by-lastcontact',
  templateUrl: './search-by-lastcontact.component.html',
  styleUrl: './search-by-lastcontact.component.scss',
})
export class SearchByLastcontactComponent {
  private customerSvc = inject(CustomerService);
  private activeModal = inject(NgbActiveModal);

  customers: iCustomer[] = [];
  isLoading!: boolean;

  getByLastContact(startDate: string, endDate: string) {
    (this.isLoading = true),
      this.customerSvc.getCustomersByLastContact(startDate, endDate).subscribe({
        next: (res) => {
          this.customers = res;
          this.activeModal.close(this.customers);
        },
      });
  }
}
