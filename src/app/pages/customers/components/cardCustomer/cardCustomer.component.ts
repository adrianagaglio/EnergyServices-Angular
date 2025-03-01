import { Router } from '@angular/router';
import { iCustomer } from '../../../../interfaces/icustomer';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-card-customer',
  templateUrl: './cardCustomer.component.html',
  styleUrl: './cardCustomer.component.scss',
})
export class CardCustomerComponent {
  private router = inject(Router);
  @Input() customer!: iCustomer;
  @Input() isCustomer!: boolean;

  seeInvoices() {
    if (this.isCustomer) {
      this.router.navigate(['/invoices']);
    } else {
      sessionStorage.setItem(
        'customerToInvoices',
        JSON.stringify(this.customer)
      );
      this.router.navigate(['/invoices']);
    }
  }
}
