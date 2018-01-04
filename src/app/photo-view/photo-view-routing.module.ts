import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { AuthGuardService } from '../shared/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'photoview', component: PhotoViewComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PhotoViewRoutingModule { }
