import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iCustomer } from '../../../../interfaces/icustomer';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-search-by-denomination',
  templateUrl: './search-by-denomination.component.html',
  styleUrl: './search-by-denomination.component.scss',
})
export class SearchByDenominationComponent {
  private customerSvc = inject(CustomerService);
  private activeModal = inject(NgbActiveModal);

  customers: iCustomer[] = [];
  isLoading!: boolean;

  getCustomersByDenominationsContain(searchTerm: string) {
    this.isLoading = true;
    this.customerSvc.getCustomersByDenominationsContain(searchTerm).subscribe({
      next: (res) => {
        this.customers = res;
        this.activeModal.close(this.customers);
      },
    });
  }
}
