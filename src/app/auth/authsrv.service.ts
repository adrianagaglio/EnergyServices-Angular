import { iAccess } from './interfaces/i-access';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  private jwtHelper: JwtHelperService = new JwtHelperService();

  userAuthSubject$ = new BehaviorSubject<iAccess | null>(null);

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  baseUrl: string = environment.baseUrl + 'auth/';
  autoLogoutTimer: any;

  register(user: Partial<iUser>) {
    return this.http.post<iAccess>(this.registerUrl, user);
  }

  login(userDates: iLoginRequest) {
    // qui uso una post perchè proteggere i dati sensibili e creare un token lato server
    return this.http.post<iAccess>(this.loginUrl, userDates).pipe(
      tap((dati) => {
        this.userAuthSubject$.next(dati);
        localStorage.setItem('accessData', JSON.stringify(dati));

        //recupero la data di scadenza del token
        const date = this.jwtHelper.getTokenExpirationDate(dati.token);
        if (date) this.autoLogout(date);
      })
    );
  }

  logout() {
    this.userAuthSubject$.next(null);
    this.decodeToken.userRoles$.next([]);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth']);
  }

  autoLogout(expDate: Date) {
    // calcolo quanto tempo manca tra la data di exp e il momento attuale
    const expMs = expDate.getTime() - new Date().getTime();

    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expMs);
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessdata: iAccess = JSON.parse(userJson);

    if (this.jwtHelper.isTokenExpired(accessdata.token)) {
      localStorage.removeItem('accessData');
      return;
    }

    this.userAuthSubject$.next(accessdata);
    this.decodeToken.userRoles$.next(this.decodeToken.getRoles());
  }

  resetPassword(passwordResetRequest: iPasswordResetRequest) {
    return this.http.patch<iResponseStringMessage>(
      this.baseUrl + 'reset-password',
      passwordResetRequest
    );
  }

  sendRequestPasswordReset(email: { email: string }) {
    return this.http.post<iResponseStringMessage>(
      this.baseUrl + 'requestChangePassword',
      email
    );
  }

  getByCustomerWithAppUser() {
    return this.http.get<iAppUserResponse>(this.baseUrl + 'withAppUser');
  }

  updateAppUser(appUser: iAppUserResponse) {
    return this.http.put<iAppUserResponse>(
      this.baseUrl + 'withAppUser',
      appUser
    );
  }

  changePassword(changePasswordRequest: iChangePasswordRequest) {
    return this.http.patch(
      this.baseUrl + 'change-password',
      changePasswordRequest
    );
  }
}
