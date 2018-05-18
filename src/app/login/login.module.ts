import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    ForbiddenComponent
  ]
})
export class LoginModule { }
