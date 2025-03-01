import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iCustomer } from '../../../../interfaces/icustomer';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-search-by-yearlyturnover',
  templateUrl: './search-by-yearlyturnover.component.html',
  styleUrl: './search-by-yearlyturnover.component.scss',
})
export class SearchByYearlyturnoverComponent {
  private customerSvc = inject(CustomerService);
  private activeModal = inject(NgbActiveModal);

  customers: iCustomer[] = [];
  isLoading!: boolean;

  getByYearlyTurnover(min: number, max: number) {
    this.isLoading = true;
    this.customerSvc.getCustomersByYearlyTurnover(min, max).subscribe({
      next: (res) => {
        this.customers = res;
        this.activeModal.close(this.customers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
