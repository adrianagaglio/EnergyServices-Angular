import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { iCustomer } from '../../../../interfaces/icustomer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchByCreationdateComponent } from '../search-by-creationdate/search-by-creationdate.component';
import { SearchByLastcontactComponent } from '../search-by-lastcontact/search-by-lastcontact.component';
import { SearchByDenominationComponent } from '../search-by-denomination/search-by-denomination.component';
import { SearchByYearlyturnoverComponent } from '../search-by-yearlyturnover/search-by-yearlyturnover.component';
import { SearchByVatcodeComponent } from '../search-by-vatcode/search-by-vatcode.component';

@Component({
  selector: 'app-foradminuser',
  templateUrl: './foradminuser.component.html',
  styleUrl: './foradminuser.component.scss',
})
export class ForadminuserComponent {
  private customerSvc = inject(CustomerService);
  private modalService = inject(NgbModal);
  searchBy: string = 'all';
  customers: iCustomer[] = [];
  isPaged: boolean = true;
  page!: number;
  pages!: number[];

  message!: string;

  isLoading: boolean = true;

  ngOnInit() {
    this.getAllCustomers(0, 10);
  }
  getAllCustomers(numberPage: number, size: number, type?: string[]) {
    this.customerSvc
      .getAllCustomers(numberPage, size, type)
      .subscribe((data) => {
        this.isPaged = true;
        this.customers = data.content;
        this.pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
        this.isLoading = false;
      });
  }
  changePage(num: number) {
    this.getAllCustomers(num, 10);
  }

  openSearchByCreationDate() {
    const modalRef = this.modalService.open(SearchByCreationdateComponent, {
      size: 'xl',
    });

    if (this.message) this.clearMessage();

    modalRef.result
      .then((res) => {
        this.customers = res;
        this.isPaged = false;
        this.searchBy = '';
        if (res.length == 0) {
          this.message = 'No customers found';
        }
      })
      .catch((reason) => {
        this.modalService.dismissAll();
        this.searchBy = '';
      });
  }

  openSearchByLastContact() {
    const modalRef = this.modalService.open(SearchByLastcontactComponent, {
      size: 'xl',
    });

    if (this.message) this.clearMessage();

    modalRef.result
      .then((res) => {
        this.customers = res;
        this.searchBy = '';
        this.isPaged = false;
        if (res.length == 0) {
          this.message = 'No customers found';
        }
      })
      .catch((reason) => {
        this.modalService.dismissAll();
        this.searchBy = '';
      });
  }

  openSearchByDenomination() {
    const modalRef = this.modalService.open(SearchByDenominationComponent, {
      size: 'xl',
    });

    if (this.message) this.clearMessage();
    modalRef.result
      .then((res) => {
        this.customers = res;
        this.searchBy = '';
        this.isPaged = false;
        if (res.length == 0) {
          this.message = 'No customers found';
        }
      })
      .catch((reason) => {
        this.modalService.dismissAll();
        this.searchBy = '';
      });
  }

  openSearchByYearlyTurnover() {
    const modalRef = this.modalService.open(SearchByYearlyturnoverComponent, {
      size: 'xl',
    });
    if (this.message) this.clearMessage();
    modalRef.result
      .then((res) => {
        this.customers = res;
        this.searchBy = '';
        this.isPaged = false;
        if (res.length == 0) {
          this.message = 'No customers found';
        }
      })
      .catch((reason) => {
        this.modalService.dismissAll();
        this.searchBy = '';
      });
  }

  openSearchByVatcode() {
    const modalRef = this.modalService.open(SearchByVatcodeComponent, {
      size: 'xl',
    });

    if (this.message) this.clearMessage();
    modalRef.result
      .then((res) => {
        this.customers = res;
        this.searchBy = '';
        this.isPaged = false;
        if (res.length == 0) {
          this.message = 'No customers found';
        }
      })
      .catch((reason) => {
        this.modalService.dismissAll();
        this.searchBy = '';
      });
  }

  clearMessage() {
    this.message = '';
    this.searchBy = 'all';
    this.getAllCustomers(0, 5);
    this.isLoading = true;
  }

  order(event: { sort: string; order: string }) {
    switch (event.order) {
      case 'asc':
        this.sortAsc(event.sort);
        break;
      case 'desc':
        this.sortDesc(event.sort);
    }
  }

  sortAsc(event: string) {
    switch (event) {
      case 'denomination':
        if (this.searchBy == 'all') {
          this.getAllCustomers(0, 10, ['denomination,asc']);
        }
        this.customers = this.customers.sort((a, b) => {
          return a.denomination.localeCompare(b.denomination);
        });
        break;
      case 'vatcode':
        if (this.searchBy == 'all') {
          this.getAllCustomers(0, 5, ['vatCode,asc']);
        }
        this.customers = this.customers.sort((a, b) => {
          return a.vatCode.localeCompare(b.vatCode);
        });
        break;
    }
  }

  sortDesc(event: string) {
    switch (event) {
      case 'denomination':
        if (this.searchBy == 'all') {
          this.getAllCustomers(0, 10, ['denomination,desc']);
        }
        this.customers = this.customers.sort((a, b) => {
          return b.denomination.localeCompare(a.denomination);
        });
        break;
      case 'vatcode':
        if (this.isPaged) {
          this.getAllCustomers(0, 5, ['vatCode,desc']);
        }
        this.customers = this.customers.sort((a, b) => {
          return b.vatCode.localeCompare(a.vatCode);
        });
        break;
    }
  }
}
