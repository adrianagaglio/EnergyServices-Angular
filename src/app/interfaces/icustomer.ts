import { iAddressResponse } from './iaddressresponse';
import { iInvoice } from './iinvoice';

export interface iCustomer {
  id: number;
  denomination: string;
  vatCode: string;
  creationDate: string;
  lastContact: string;
  yearlyTurnover: number;
  pec: string;
  phone: string;
  contactPhone: string;
  type: string;
  addresses: {
    RegisteredOfficeAddress: iAddressResponse;
    OperationalHeadquartersAddress: iAddressResponse;
  };
  invoices: iInvoice[];
  image: string;
}
