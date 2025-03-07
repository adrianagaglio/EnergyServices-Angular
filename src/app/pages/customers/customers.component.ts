import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  constructor(
    private customerSvc: CustomerService,
    private authSvc: AuthService
  ) {
    this.authSvc.role$.subscribe((role) => {
      if (role && role === 'CUSTOMER') {
        this.isCustomer = true;
      } else {
        this.isCustomer = false;
      }
    });
  }

  isCustomer: boolean = false;

  ngOnInit(): void {}
}
