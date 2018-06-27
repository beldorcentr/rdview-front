import { Component } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get name() {
    return this.authService.getName();
  }

  get isAuthorized() {
    return this.authService.isAuthorized;
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
