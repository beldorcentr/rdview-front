import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class AuthStatisticsService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  logVisit() {
    const apiUrl = environment.logvisitUrl;
    const appCode = environment.appCode;

    this.http.post(apiUrl,  {}, {
      headers: new HttpHeaders({
        'Authorization': this.authService.getAuthorizationHeader()
      }),
      params: new HttpParams().set('appCode', appCode.toString())
    }).subscribe(() => {});
  }
}
