import { iAddressResponse } from './iaddressresponse';
import { iInvoice } from './iinvoice';

export interface iCustomerWithAppUser {
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
  username: string;
  email: string;
  name: string;
  surname: string;
}
