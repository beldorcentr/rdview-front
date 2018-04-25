import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as jwtDecode from 'jwt-decode';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private userDataSubscription: Subscription;
  private userData: any;

  private isAuthorizedSubscription: Subscription;
  private _isAuthorized: boolean;

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  constructor(private http: HttpClient,
      private oidcSecurityService: OidcSecurityService) {
    this.isAuthorizedSubscription = this.oidcSecurityService
      .getIsAuthorized().subscribe((isAuthorized: boolean) => {
        this._isAuthorized = isAuthorized;
      });

    this.userDataSubscription = this.oidcSecurityService
      .getUserData().subscribe((userData: any) => {
        this.userData = userData;
      });
  }

  getIsAuthorized(): Observable<boolean> {
    return this.oidcSecurityService.getIsAuthorized();
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  getToken(): string {
    return this.oidcSecurityService.getToken();
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this.getToken()}`;
  }

  getName(): string {
    return this.userData.name;
  }

  getEmail(): string {
    return this.userData.email;
  }
}
