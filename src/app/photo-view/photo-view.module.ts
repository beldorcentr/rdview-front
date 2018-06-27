import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoViewRoutingModule } from './photo-view-routing.module';
import { PassageSelectorComponent } from './photo-view/passage-selector/passage-selector.component';
import { MapPositionComponent } from './photo-view/map-position/map-position.component';
import { PositionInitializerComponent } from './photo-view/position-initializer/position-initializer.component';
import { PositionMovementComponent } from './photo-view/position-movement/position-movement.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PhotoViewRoutingModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [
    PhotoViewComponent,
    PassageSelectorComponent,
    MapPositionComponent,
    PositionInitializerComponent,
    PositionMovementComponent
  ]
})
export class PhotoViewModule { }
