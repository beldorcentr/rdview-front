import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoViewRoutingModule } from './photo-view-routing.module';
import { PassageSelectorComponent } from './photo-view/position-control/passage-selector/passage-selector.component';
import { MapPositionComponent } from './photo-view/position-control/map-position/map-position.component';
import { PositionInitializerComponent } from './photo-view/position-control/position-initializer/position-initializer.component';
import { PositionMovementComponent } from './photo-view/position-control/position-movement/position-movement.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';
import { SharedModule } from 'app/shared/shared.module';
import { PositionControlComponent } from './photo-view/position-control/position-control.component';
import { SimplePositionControlComponent } from './photo-view/simple-position-control/simple-position-control.component';

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
    PositionMovementComponent,
    PositionControlComponent,
    SimplePositionControlComponent
  ]
})
export class PhotoViewModule { }
