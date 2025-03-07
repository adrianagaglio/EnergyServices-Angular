import { Component, OnInit } from '@angular/core';
import { iAppUserResponse } from '../../auth/interfaces/i-appUserResponse';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  customer!: iAppUserResponse;
  avatar: string = '';

  constructor(private authSvc: AuthService, private router: Router) {
    if (this.authSvc.auth$.getValue()) {
      authSvc.getByCustomerWithAppUser().subscribe((data) => {
        this.customer = data;
        this.avatar = this.customer.avatar;
      });
    }
  }
  role!: string;
  isActive: boolean = false;

  ngOnInit(): void {
    this.authSvc.role$.subscribe((role) => {
      if (role) this.role = role;
    });
  }

  logout() {
    this.authSvc.logout();
  }
  toggleActive() {
    this.isActive = !this.isActive;
  }
  //commento
}
