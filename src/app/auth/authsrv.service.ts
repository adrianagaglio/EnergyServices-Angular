import { iAccess } from './interfaces/i-access';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { iUser } from './interfaces/i-user';
import { iLoginRequest } from './interfaces/i-login-request';
import { BehaviorSubject, tap } from 'rxjs';
import { iPasswordResetRequest } from './interfaces/i-password-reset-request';
import { DecodeTokenService } from '../services/decode-token.service';
import { iResponseStringMessage } from './interfaces/i-response-string-message';
import { iAppUserResponse } from './interfaces/i-appUserResponse';
import { iChangePasswordRequest } from './interfaces/i-change-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthsrvService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private decodeToken: DecodeTokenService
  ) {
    this.restoreUser();
  }

  auth$ = new BehaviorSubject<iAccess | null>(null);

  url: string = environment.baseUrl;
  registerUrl: string = this.url + 'auth/register';
  loginUrl: string = this.url + 'auth/login';

  register(user: Partial<iUser>) {
    return this.http.post<iAccess>(this.registerUrl, user);
  }

  login(userDates: iLoginRequest) {
    // qui uso una post perchè proteggere i dati sensibili e creare un token lato server
    return this.http.post<iAccess>(this.loginUrl, userDates).pipe(
      tap((authData) => {
        this.auth$.next(authData);
        localStorage.setItem('auth', JSON.stringify(authData));
      })
    );
  }

  logout() {
    this.auth$.next(null);
    this.decodeToken.userRoles$.next([]);
    localStorage.removeItem('auth');
    this.router.navigate(['/auth']);
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('auth');
    if (!userJson) return;

    const auth: iAccess = JSON.parse(userJson);

    this.auth$.next(auth);
    this.decodeToken.userRoles$.next(this.decodeToken.getRoles());
  }

  resetPassword(passwordResetRequest: iPasswordResetRequest) {
    return this.http.patch<iResponseStringMessage>(
      this.url + 'reset-password',
      passwordResetRequest
    );
  }

  sendRequestPasswordReset(email: { email: string }) {
    return this.http.post<iResponseStringMessage>(
      this.url + 'requestChangePassword',
      email
    );
  }

  getByCustomerWithAppUser() {
    return this.http.get<iAppUserResponse>(this.url + 'auth/withAppUser');
  }

  updateAppUser(appUser: iAppUserResponse) {
    return this.http.put<iAppUserResponse>(
      this.url + 'auth/withAppUser',
      appUser
    );
  }

  changePassword(changePasswordRequest: iChangePasswordRequest) {
    return this.http.patch(
      this.url + 'auth/change-password',
      changePasswordRequest
    );
  }
}
