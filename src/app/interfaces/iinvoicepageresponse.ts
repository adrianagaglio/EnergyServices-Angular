import { iAddress } from '../auth/interfaces/i-address';
import { iAddressResponse } from './iaddressresponse';
import { iInvoiceresponse } from './iinvoiceresponse';

export interface iInvoicepageresponse {
  content: iInvoiceresponse[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Customer {
  denomination: string;
  vatCode: string;
  creationDate: string;
  lastContact: any;
  yearlyTurnover: number;
  pec: string;
  phone: string;
  contactPhone: string;
  type: string;
  addresses: iAddressResponse[];
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
