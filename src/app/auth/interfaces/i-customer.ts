import { iAddress } from "./i-address";

export interface iCustomer {
  denomination: string;
  vatCode: string;
  pec: string;
  phone: string;
  contactPhone: string;
  type: string;
  registeredOfficeAddress: iAddress;
  operationalHeadquartersAddress: iAddress;
}
