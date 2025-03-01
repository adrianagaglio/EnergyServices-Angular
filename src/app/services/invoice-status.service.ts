import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iInvoice } from '../interfaces/iinvoice';
import { iInvoiceStatus } from '../interfaces/iinvoice-status';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InvoiceStatusService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'invoice_status';

  getAll(): Observable<iInvoiceStatus[]> {
    return this.http.get<iInvoiceStatus[]>(this.url);
  }

  create(status: Partial<iInvoiceStatus>): Observable<iInvoiceStatus> {
    return this.http.post<iInvoiceStatus>(this.url, status);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}/${id}`);
  }
}
