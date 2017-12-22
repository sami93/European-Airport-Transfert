import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {UrlService} from './url.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(public auth: AuthService, private router: Router,    public urlservice: UrlService) {}

  canActivate() {
    return this.auth.isAdmin;
  }

}
