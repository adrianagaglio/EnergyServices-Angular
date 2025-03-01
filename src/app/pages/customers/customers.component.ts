import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { DecodeTokenService } from '../../services/decode-token.service';
import { iCustomer } from '../../interfaces/icustomer';
import { Icustomerpageresponse } from '../../interfaces/icustomerpageresponse';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  constructor(
    private customerSvc: CustomerService,
    private decodeToken: DecodeTokenService
  ) {
    this.roles = this.decodeToken.userRoles$.getValue();

    if (this.roles.includes('CUSTOMER')) {
      this.isCustomer = true;
    } else {
      this.isCustomer = false;
    }
  }
  roles: string[] = [];
  isCustomer: boolean = false;

  ngOnInit(): void {}
}
