import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  private accessTokenKey = 'access_token';
  private tokenExpirationDateKey = 'token_expiration_date';

  private payload;

  get isAuthorized(): boolean {
    const token = this.getToken();
    const expirationDate = this.getTokenExpirationDate();
    return token != null && token !== '' && expirationDate > new Date();
  }

  constructor(private http: HttpClient) {
    if (this.isAuthorized) {
      this.payload = jwtDecode(this.getToken());
    }
  }

  login(username: string, password: string): Promise<string> {
    const body = new HttpParams({
      fromObject: {
        client_id: environment.authorizationCliendId,
        username,
        password,
        grant_type: 'password'
      }
    });

    return this.http.post(environment.authorizationEndpoint, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).toPromise()
      .then((data: any) => {
        const accessToken = data.access_token;
        this.setToken(accessToken);

        const expiresIn = +data.expires_in;
        const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
        this.setTokenExpirationDate(expiresDate);

        this.payload = jwtDecode(accessToken);
        return accessToken;
      });
  }

  logout() {
    this.removeToken();
    this.removeTokenExpirationDate();
  }

  getToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  getTokenExpirationDate(): Date {
    return new Date(localStorage.getItem(this.tokenExpirationDateKey));
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this.getToken()}`;
  }

  getName(): string {
    return this.payload.given_name;
  }

  getEmail(): string {
    return this.payload.email;
  }

  private setToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  private removeToken() {
    localStorage.removeItem(this.accessTokenKey);
  }

  private setTokenExpirationDate(date: Date) {
    localStorage.setItem(this.tokenExpirationDateKey, date.toString());
  }

  private removeTokenExpirationDate() {
    localStorage.removeItem(this.tokenExpirationDateKey);
  }
}
