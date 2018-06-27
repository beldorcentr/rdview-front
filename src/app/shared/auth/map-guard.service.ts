import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class MapGuardService implements CanActivate {

  private viewMapAction = 'view_map';
  private viewPhotosAction = 'view_photos';

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    return this.authService.getUserActions().then((actions: string[]) => {
      if (actions.includes(this.viewMapAction) &&
          actions.includes(this.viewPhotosAction)) {
        return true;
      }

      this.router.navigate(['/forbidden']);
      return false;
    });
  }
}
