import { iCustomerresponseforinvoice } from './icustomerresponseforinvoice';

export interface iInvoiceresponseforcustomer {
  id: number;
  date: string;
  amount: number;
  number: number;
  status: string;
  notes: string;
}
