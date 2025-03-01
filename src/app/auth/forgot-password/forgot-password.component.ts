import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthsrvService } from '../authsrv.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  form: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authSvc = inject(AuthsrvService);

  email: { email: string } = { email: '' };

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  sendResetEmail() {
    if (this.form.valid) {
      this.email.email = this.form.value.email;
      this.authSvc.sendRequestPasswordReset(this.email).subscribe(() => {
        alert('Email sent successfully');
        this.router.navigate(['auth']);
      });
    }
  }
}
