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

  constructor(private authServer: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authServer.login();
  }

  logout() {
    this.authServer.logout();
  }
}
