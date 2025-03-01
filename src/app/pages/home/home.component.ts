import { Component } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { iTotalresponse } from '../../interfaces/itotalresponse';
import { iInvoiceresponse } from '../../interfaces/iinvoiceresponse';
import { iInvoicepageresponse } from '../../interfaces/iinvoicepageresponse';
import { CustomerService } from '../../services/customer.service';
import { iTotalcustomersresponse } from '../../interfaces/itotalcustomersresponse';
import { DecodeTokenService } from '../../services/decode-token.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private invoiceSvc: InvoiceService,
    private customerSvc: CustomerService,
    private decodeToken: DecodeTokenService
  ) {}

  totalAmount!: iTotalresponse;
  lastYearAmount!: iTotalresponse;
  totalCustomers!: iTotalcustomersresponse;

  waitingPayments!: iInvoiceresponse[];

  limit: number = 5;

  latest!: iInvoiceresponse[];

  isLoading: boolean = true;

  ngOnInit() {
    let roles: string[] = this.decodeToken.userRoles$.getValue();
    if (!roles.includes('CUSTOMER')) {
      forkJoin({
        totalAmount: this.invoiceSvc.getTotal(new Date().getFullYear()),
        lastYearAmount: this.invoiceSvc.getTotal(new Date().getFullYear() - 1),
        waitingPayments: this.invoiceSvc.getWaitingPayment(),
        latest: this.invoiceSvc.getLatest(this.limit),
        totalCustomers: this.customerSvc.getTotal(),
      }).subscribe({
        next: (res) => {
          // Setta i risultati delle chiamate
          this.totalAmount = {
            ...res.totalAmount,
            total: parseFloat(res.totalAmount.total.toFixed(2)),
          };
          this.lastYearAmount = {
            ...res.lastYearAmount,
            total: parseFloat(res.lastYearAmount.total.toFixed(2)),
          };
          this.waitingPayments = res.waitingPayments;
          this.latest = res.latest.content;
          this.totalCustomers = res.totalCustomers;
          this.isLoading = false;
        },
        complete: () => {
          // Imposta isLoading a false quando tutte le chiamate sono completate
          this.isLoading = false;
        },
      });
    }
  }

  changeLimit() {
    this.invoiceSvc.getLatest(this.limit).subscribe((res) => {
      this.latest = res.content;
    });
  }
}
