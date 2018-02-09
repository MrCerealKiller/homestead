import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthorizeService } from '../services/authorize.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthorizeService,
              private router: Router) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

}
