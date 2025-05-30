import { Component, inject, Input } from '@angular/core';
import { iInvoiceresponse } from '../../interfaces/iinvoiceresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { InvoiceService } from '../../services/invoice.service';
import { iInvoiceupdaterequest } from '../../interfaces/iinvoiceupdaterequest';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss',
})
export class InvoiceCardComponent {
  constructor(
    private authSvc: AuthService,
    private invoiceSvc: InvoiceService,
    private router: Router
  ) {}
  private modalService = inject(NgbModal);

  @Input() invoice!: Partial<iInvoiceresponse>;

  roles: string[] = [];
  toPay: boolean = false;
  isHome: boolean = false;

  ngOnInit() {
    this.authSvc.role$.subscribe((role) => {
      if (role === 'CUSTOMER') {
        if (
          this.invoice!.status == 'SENT' ||
          this.invoice!.status == 'PARTIALLY PAID' ||
          this.invoice!.status == 'OVERDUE'
        ) {
          this.toPay = true;
        }
      }
    });

    if (this.router.url == '/') {
      this.isHome = true;
    }
  }

  openModal(invoice: Partial<iInvoiceresponse>) {
    const modalRef = this.modalService.open(UpdateInvoiceComponent, {
      size: 'xl',
    });

    modalRef.componentInstance.invoice = invoice;

    modalRef.result.then((res) => {
      this.invoice = res;
    });
  }

  pay() {
    let request: iInvoiceupdaterequest = {
      status: 'PAID',
      notes: this.invoice!.notes ? this.invoice!.notes : '',
    };
    this.invoiceSvc
      .updateStatus(this.invoice.number!, request)
      .subscribe((res) => {
        this.invoice = res;
        this.toPay = false;
      });
  }
}
