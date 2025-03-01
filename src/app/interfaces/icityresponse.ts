import { iDistrictResponse } from './idistrictresponse';

export interface iCityResponse {
  id: number;
  name: string;
  district: iDistrictResponse;
}
