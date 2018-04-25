import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { PhotoViewModule } from './photo-view/photo-view.module';
import { CoreModule } from './core/core.module';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load_using_stsServer(environment.authorizationEndpoint);
}

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
    SharedModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private oidcSecurityService: OidcSecurityService,
      private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
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
    });
  }
}
