import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { PhotoViewModule } from './photo-view/photo-view.module';
import { CoreModule } from './core/core.module';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load_using_stsServer(environment.authorizationEndpoint);
}

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { StatisticModule } from './statistic/statistic.module';
import { AuthService } from './shared/auth/auth.service';
import { AuthStatisticsService } from './shared/auth/auth-statistics.service';
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    LoginModule,
    PhotoViewModule,
    StatisticModule,
    SharedModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    AuthModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private oidcSecurityService: OidcSecurityService,
      private oidcConfigService: OidcConfigService,
      private authServer: AuthService,
      private authStatisticsService: AuthStatisticsService) {
    this.configureOauth();
    this.logvisit();
  }

  private configureOauth() {
    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
      try {
        this.initOauthConfiguration();
      } catch (err) {
        // OAuth init error
        alert('Произошла ошибка настройки авторизации. Приложение не сможет работать.');
      }
    });
  }

  private logvisit() {
    if (!environment.production) {
      return;
    }
    const isAuthorized$ = this.authServer.getIsAuthorized().subscribe(isAuthorized => {
      if (isAuthorized) {
        this.authStatisticsService.logVisit();
        isAuthorized$.unsubscribe();
      }
    });
  }

  private initOauthConfiguration() {
    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.stsServer = environment.authorizationEndpoint;
    openIDImplicitFlowConfiguration.redirect_url = environment.redirectUrl;
    openIDImplicitFlowConfiguration.client_id = environment.clientId;
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = environment.postLogoutRedirectUrl;
    openIDImplicitFlowConfiguration.post_login_route = environment.postLoginRoute;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = environment.maxTokenOffsetInSeconds;

    const authWellKnownEndpoints = new AuthWellKnownEndpoints();
    authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);
  }
}
