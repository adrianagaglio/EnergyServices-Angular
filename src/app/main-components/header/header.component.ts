import { Component, OnInit } from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { DecodeTokenService } from '../../services/decode-token.service';
import { Subscription } from 'rxjs';
import { iAppUserResponse } from '../../auth/interfaces/i-appUserResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  customer!: iAppUserResponse;
  avatar: string = '';

  constructor(
    private authSvc: AuthsrvService,
    private decodeToken: DecodeTokenService,
    private router: Router
  ) {
    if (this.authSvc.userAuthSubject$.getValue()) {
      authSvc.getByCustomerWithAppUser().subscribe((data) => {
        this.customer = data;
        this.avatar = this.customer.avatar;
      });
    }
  }
  roles: string[] = [];
  private rolesSubscription!: Subscription;
  isActive: boolean = false;

  ngOnInit(): void {
    this.rolesSubscription = this.decodeToken.userRoles$.subscribe((roles) => {
      this.roles = roles || [];
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
