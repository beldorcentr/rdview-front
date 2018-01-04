import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  isLoading: boolean;
  isHttpError: boolean;
  isWrongCredentials: boolean;

  username: string;
  password: string;

  constructor(private authServer: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.isLoading = true;
    this.isHttpError = false;
    this.isWrongCredentials = false;

    this.authServer.login(this.username, this.password)
      .then(() => {
        this.router.navigate([this.returnUrl]);
      }, (err: HttpErrorResponse) => {
        this.isLoading = false;

        if (err.status === 400) {
          this.isWrongCredentials = true;
        } else {
          this.isHttpError = true;
        }
      });
  }

  logout() {
    this.authServer.logout();
  }

  clearErrors() {
    this.isHttpError = false;
    this.isWrongCredentials = false;
  }
}
