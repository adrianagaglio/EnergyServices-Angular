import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DecodeTokenService } from '../services/decode-token.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate, CanActivateChild {
  constructor(
    private decodeToken: DecodeTokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (!this.decodeToken.userRoles$.getValue().includes('CUSTOMER')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
