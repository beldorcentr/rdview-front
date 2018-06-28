import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/auth/auth-guard.service';
import { MapGuardService } from 'app/shared/auth/map-guard.service';
import { StatisticComponent } from './statistic/statistic.component';

const appRoutes: Routes = [
  {
    path: 'statistic',
    component: StatisticComponent,
    canActivate: [
      AuthGuardService,
      MapGuardService
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StatisticRoutingModule { }
