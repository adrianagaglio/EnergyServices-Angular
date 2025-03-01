import { iCustomer } from './icustomer';

export interface Icustomerpageresponse {
  content: iCustomer[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  size: number;
  first: boolean;
  number: number;
  empty: boolean;
}
