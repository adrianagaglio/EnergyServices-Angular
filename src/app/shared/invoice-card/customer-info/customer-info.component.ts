import { iCustomerresponseforinvoice } from './../../../interfaces/icustomerresponseforinvoice';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss',
})
export class CustomerInfoComponent {
  @Input() customer!: iCustomerresponseforinvoice;
}
