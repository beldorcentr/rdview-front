import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private userData: any;
  private _isAuthorized: boolean;

  private userActionsUrl = 'api/v1/users/actions';

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  constructor(private http: HttpClient,
      private oidcSecurityService: OidcSecurityService) { }

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

  getUserActions(): Promise<string[]> {
    const headers = new HttpHeaders({
      'Authorization': this.getAuthorizationHeader()
    });

    return this.http.get<string[]>(this.userActionsUrl, { headers })
      .toPromise();
  }
}
