import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iCityResponse } from '../interfaces/icityresponse';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { iDistrictResponse } from '../interfaces/idistrictresponse';

@Injectable({
  providedIn: 'root',
})
export class CitysrvService {
  citySubject$ = new BehaviorSubject<iCityResponse[] | null>(null);
  districtSubject$ = new BehaviorSubject<iDistrictResponse[] | null>(null);

  private cityUrl: string = `${environment.baseUrl}cities`;
  private districtUrl: string = `${environment.baseUrl}districts`;

  constructor(private http: HttpClient, private router: Router) {}

  getAllCities() {
    return this.http
      .get<iCityResponse[]>(this.cityUrl)
      .pipe(
        tap((cities: iCityResponse[] | null) => this.citySubject$.next(cities))
      );
  }

  getCitiesByDistrictId(districtId: number) {
    const url = `${this.cityUrl}/byDistrictId/${districtId}`;
    return this.http.get<iCityResponse[]>(url);
  }

  getAllDistricts() {
    return this.http
      .get<iDistrictResponse[]>(this.districtUrl)
      .pipe(tap((districts) => this.districtSubject$.next(districts)));
  }
}
