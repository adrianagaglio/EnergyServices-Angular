import { iCustomerresponseforinvoice } from './icustomerresponseforinvoice';

export interface iInvoiceresponse {
  id: number;
  date: string;
  amount: number;
  number: number;
  notes: string;
  status: string;
  customer: iCustomerresponseforinvoice;
}
