import { iCityResponse } from './icityresponse';

export interface iAddressResponse {
  id: number;
  street: string;
  addressNumber: string;
  cap: number;
  city: iCityResponse;
}
