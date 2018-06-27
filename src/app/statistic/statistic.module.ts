import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { RoadStatisticMapComponent } from './statistic/road-statistic-map/road-statistic-map.component';
import { StatisticService } from './statistic.service';
import { NetworkStatisticComponent } from './statistic/network-statistic/network-statistic.component';
import { RoadStatisticComponent } from './statistic/road-statistic/road-statistic.component';
import { RoadTypePipe } from './road-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StatisticRoutingModule,
  ],
  declarations: [
    StatisticComponent,
    RoadStatisticMapComponent,
    NetworkStatisticComponent,
    RoadStatisticComponent,
    RoadTypePipe
  ],
  providers: [
    StatisticService
  ]
})
export class StatisticModule { }
