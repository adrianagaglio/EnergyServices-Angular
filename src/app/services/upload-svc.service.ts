import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UploadSvcService {
  constructor(private Http: HttpClient) {}

  baseUrl = environment.baseUrl + 'upload';

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.Http.post<{ url: string }>(this.baseUrl, formData);
  }
}
