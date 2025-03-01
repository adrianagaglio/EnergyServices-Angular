import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AdminOrUserGuard } from './guards/admin-or-user.guard';
import { LoggedGuard } from './guards/logged-user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AdminOrUserGuard, LoggedGuard],
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./pages/invoices/invoices.module').then((m) => m.InvoicesModule),
    canActivate: [LoggedGuard],
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./pages/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
    canActivate: [LoggedGuard],
  },
  {
    path: 'create-invoice',
    loadChildren: () =>
      import('./pages/create-invoice/create-invoice.module').then(
        (m) => m.CreateInvoiceModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
