import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private oidcSecurityService: OidcSecurityService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.oidcSecurityService.getIsAuthorized().pipe(
      map((isAuthorized: boolean) => {
        if (isAuthorized) {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
