import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';

import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AppRoutingModule } from './app-routing.module';
import { PhotoViewModule } from './photo-view/photo-view.module';
import { CoreModule } from './core/core.module';

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
    ToasterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
