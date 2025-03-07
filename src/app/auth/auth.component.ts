import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iLoginRequest } from './interfaces/i-login-request';
import { tap } from 'rxjs';
import { iAccess } from './interfaces/i-access';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  form: FormGroup;

  message!: string;

  constructor(private authSvc: AuthService, private router: Router) {
    this.form = new FormGroup({
      identifier: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.form.valid) {
      //prendo i dati dal form e li inserisco in una varabile
      const formData: iLoginRequest = this.form.value;
      this.authSvc
        .login(formData)
        .pipe(tap((auth) => this.authSvc.role$.next(auth.role)))
        .subscribe((auth: iAccess) => {
          this.message = 'Logged in successfully';
          setTimeout(() => {
            if (auth.role === 'CUSTOMER') {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/customers']);
            }
          }, 1000);
        });
    } else {
      console.log('form invalido');
    }
  }

  clearMessage() {
    this.message = '';
  }
}
