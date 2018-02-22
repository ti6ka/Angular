import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {IndexService} from './index.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private indexService: IndexService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (Cookie.get('token')) {
      return true;
    } else {
      this.router.navigate(['/index']);
      return false;
    }
  }
}
