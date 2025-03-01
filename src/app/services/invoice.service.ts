import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iInvoiceresponse } from '../interfaces/iinvoiceresponse';
import { iInvoiceresponseforcustomer } from '../interfaces/iinvoiceresponseforcustomer';
import { DecodeTokenService } from './decode-token.service';
import { iInvoiceupdaterequest } from '../interfaces/iinvoiceupdaterequest';
import { iInvoicerequest } from '../interfaces/iinvoicerequest';
import { iInvoicepageresponse } from '../interfaces/iinvoicepageresponse';
import { iTotalresponse } from '../interfaces/itotalresponse';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private http: HttpClient,
    private decodeToken: DecodeTokenService
  ) {}

  url: string = environment.baseUrl + 'invoice';

  invoices$ = new BehaviorSubject<iInvoiceresponse[]>([]);

  getAll(): Observable<iInvoiceresponse[]> {
    return this.http
      .get<iInvoiceresponse[]>(this.url)
      .pipe(tap((res) => this.invoices$.next(res)));
  }

  getAllPaged(
    page: number,
    size: number,
    sort: string
  ): Observable<iInvoicepageresponse> {
    return this.http.get<iInvoicepageresponse>(
      this.url + '/paged' + `?page=${page}&size=${size}&sort=${sort}`
    );
  }

  getAllByCustomer(): Observable<iInvoiceresponseforcustomer[]> {
    return this.http.get<iInvoiceresponseforcustomer[]>(
      this.url + '/byCustomer'
    );
  }

  getById(id: number): Observable<any> {
    if (this.decodeToken.userRoles$.value.includes('CUSTOMER')) {
      return this.http.get<iInvoiceresponseforcustomer>(
        `${this.url}/invoce/${id}`
      );
    }
    return this.http.get<iInvoiceresponse>(`${this.url}/${id}`);
  }

  getByNumber(number: number): Observable<any> {
    if (this.decodeToken.userRoles$.value.includes('CUSTOMER')) {
      return this.http.get<iInvoiceresponseforcustomer>(
        `${this.url}/by-number?number=${number}`
      );
    }
    return this.http.get<iInvoiceresponse>(
      `${this.url}/by-number?number=${number}`
    );
  }

  updateStatus(
    number: number,
    request: iInvoiceupdaterequest
  ): Observable<iInvoiceresponse> {
    return this.http.put<iInvoiceresponse>(`${this.url}/${number}`, request);
  }

  create(request: iInvoicerequest): Observable<iInvoiceresponse> {
    return this.http.post<iInvoiceresponse>(this.url, request);
  }

  getAllByStatus(
    status: string,
    direction: string = 'ASC'
  ): Observable<iInvoiceresponse[]> {
    return this.http.get<iInvoiceresponse[]>(
      `${this.url}/by-status?status=${status}&direction=${direction}`
    );
  }

  getAllByCustomerInfo(
    param: any,
    direction: string = 'ASC'
  ): Observable<iInvoiceresponse[]> {
    let params: string = '';
    if (typeof param == 'number') {
      params += `customerId=${param}`;
    } else if (typeof param == 'string' && !param.includes('@')) {
      params += `vatCode=${param}`;
    } else if (typeof param == 'string' && param.includes('@')) {
      params += `pec=${param}`;
    }
    return this.http.get<iInvoiceresponse[]>(
      `${this.url}/by-customer?${params}&direction=${direction}`
    );
  }

  getAllByDate(date: string): Observable<iInvoiceresponse[]> {
    return this.http.get<iInvoiceresponse[]>(
      `${this.url}/by-date?date=${date}`
    );
  }

  getAllByYear(year: number): Observable<iInvoiceresponse[]> {
    return this.http.get<iInvoiceresponse[]>(
      `${this.url}/by-year?year=${year}`
    );
  }

  getAllByAmountRange(
    min: number,
    max: number
  ): Observable<iInvoiceresponse[]> {
    return this.http.get<iInvoiceresponse[]>(
      `${this.url}/amount-range?min=${min}&max=${max}`
    );
  }

  getTotal(year: number): Observable<iTotalresponse> {
    return this.http.get<iTotalresponse>(this.url + `/total?year=${year}`);
  }

  getWaitingPayment(): Observable<iInvoiceresponse[]> {
    return this.http.get<iInvoiceresponse[]>(this.url + '/waiting-payment');
  }

  getLatest(limit: number): Observable<iInvoicepageresponse> {
    return this.http.get<iInvoicepageresponse>(
      this.url + `/latest?limit=${limit}`
    );
  }

  getTotalByCustomer(year: number): Observable<iTotalresponse> {
    return this.http.get<iTotalresponse>(
      this.url + `/total-by-customer?year=${year}`
    );
  }
}
