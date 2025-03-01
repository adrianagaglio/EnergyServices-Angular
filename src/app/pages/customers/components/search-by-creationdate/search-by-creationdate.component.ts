import { Component, inject } from '@angular/core';
import { iCustomer } from '../../../../interfaces/icustomer';
import { CustomerService } from '../../../../services/customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-by-creationdate',
  templateUrl: './search-by-creationdate.component.html',
  styleUrl: './search-by-creationdate.component.scss',
})
export class SearchByCreationdateComponent {
  private customerSvc = inject(CustomerService);
  private activeModal = inject(NgbActiveModal);

  customers: iCustomer[] = [];
  isLoading!: boolean;
  getByCreationDate(startDate: string, endDate: string) {
    this.isLoading = true;
    this.customerSvc.getCustomersByCreationDate(startDate, endDate).subscribe({
      next: (res) => {
        this.customers = res;
        this.activeModal.close(this.customers);
      },
    });
  }
}
