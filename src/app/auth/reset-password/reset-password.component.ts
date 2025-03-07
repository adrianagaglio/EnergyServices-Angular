import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iPasswordResetRequest } from '../interfaces/i-password-reset-request';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  form: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authSvc = inject(AuthService);

  token: string | null = null;

  password: string = '';

  constructor() {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      token: new FormControl(null, [Validators.required]),
    });

    this.token = this.route.snapshot.paramMap.get('token');

    this.form.get('token')?.setValue(this.token);
  }

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
