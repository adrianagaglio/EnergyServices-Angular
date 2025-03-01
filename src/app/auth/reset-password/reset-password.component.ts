import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iPasswordResetRequest } from '../interfaces/i-password-reset-request';
import { AuthsrvService } from '../authsrv.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  form: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authSvc = inject(AuthsrvService);
  private jwtHelper: JwtHelperService = new JwtHelperService();

  isTokenExpired: boolean = false;
  token: string | null = null;
  username: string | null = null;

  password: string = '';

  constructor() {
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.isTokenExpired = this.jwtHelper.isTokenExpired(this.token);
      this.username = this.jwtHelper.decodeToken(this.token).sub;
    }
    if (this.isTokenExpired) {
      this.token = null;
      this.username = null;
    }
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      token: new FormControl(this.token, [Validators.required]),
    });
  }

  ngOnInit() {}

  resetPassword() {
    if (this.form.valid) {
      const formData: iPasswordResetRequest = this.form.value;

      this.authSvc.resetPassword(formData).subscribe({
        next: (data) => {
          alert(data.message);
          this.router.navigate(['auth']);
        },
        error: (data) => {
          alert(data.error.message);
        },
      });
    }
  }
}
