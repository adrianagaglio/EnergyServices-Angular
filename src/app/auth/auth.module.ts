import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AlertModule } from '../shared/alert/alert/alert.module';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    ResetPasswordComponent,
    RegisteruserComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    FormsModule,
    AlertModule,
  ],
})
export class AuthModule {}
