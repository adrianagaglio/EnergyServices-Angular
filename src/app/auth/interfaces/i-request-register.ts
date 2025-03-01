import { iCustomer } from "./i-customer";

export interface iRequestRegister {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  customer: iCustomer;
  avatar?: string;
}
