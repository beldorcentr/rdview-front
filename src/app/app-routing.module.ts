import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuardService } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '**', redirectTo: '/photoview' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
