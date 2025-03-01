import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserGuard } from '../guards/user.guard';
import { GuestGuard } from '../guards/guest.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'registeruser',
    component: RegisteruserComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [GuestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
