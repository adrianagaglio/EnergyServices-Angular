import { iCustomer } from './icustomer';
import { iInvoiceStatus } from './iinvoice-status';

export interface iInvoice {
  id: number;
  date: string;
  amount: number;
  number: number;
  customer: iCustomer;
  status: iInvoiceStatus;
}
