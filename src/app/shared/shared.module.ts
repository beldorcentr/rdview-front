import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ToasterModule } from 'angular2-toaster';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToasterModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    AuthGuardService,
    AuthService
  ]
})
export class SharedModule { }
