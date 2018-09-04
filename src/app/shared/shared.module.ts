import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ToasterModule } from 'angular2-toaster';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MapGuardService } from './auth/map-guard.service';
import { RoadTypeaheadInputComponent } from './road-typeahead-input/road-typeahead-input.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LoadingIndicatorService } from './loading-indicator/loading-indicator.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthStatisticsService } from './auth/auth-statistics.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToasterModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [
    RoadTypeaheadInputComponent,
    LoadingIndicatorComponent,
    SidebarComponent
  ],
  providers: [
    AuthGuardService,
    MapGuardService,
    AuthService,
    AuthStatisticsService,
    LoadingIndicatorService
  ],
  exports: [
    RoadTypeaheadInputComponent,
    LoadingIndicatorComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
