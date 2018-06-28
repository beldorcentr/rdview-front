import { Component } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authServer: AuthService) { }

  login() {
    this.authServer.login();
  }

  logout() {
    this.authServer.logout();
  }
}
