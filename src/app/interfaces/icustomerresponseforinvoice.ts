import { iAddress } from '../auth/interfaces/i-address';
import { iAddressResponse } from './iaddressresponse';

export interface iCustomerresponseforinvoice {
  denomination: string;
  vatCode: string;
  creationDate: string;
  lastContact: string | null;
  yearlyTurnover: number;
  pec: string;
  phone: string;
  contactPhone: string;
  type: string;
  addresses: {
    RegisteredOfficeAddress: iAddressResponse;
    OperationalHeadquartersAddress: iAddressResponse;
  };
}
