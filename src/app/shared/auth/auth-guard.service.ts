import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.authService.getIsAuthorized().pipe(
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
