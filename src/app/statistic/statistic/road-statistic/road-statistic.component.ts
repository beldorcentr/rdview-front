import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoadStatisticByYear } from 'app/statistic/road-statistic-by-year';
import { RoadStatistic } from 'app/statistic/road-statistic';

@Component({
  selector: 'app-road-statistic',
  templateUrl: './road-statistic.component.html',
  styleUrls: ['./road-statistic.component.scss']
})
export class RoadStatisticComponent {

  @Input() roadStatisticByYear: RoadStatisticByYear;
  @Input() selectedRoadStatistic: RoadStatistic;
  @Output() selectRoadStatistic = new EventEmitter<RoadStatistic>();

  clickRoadStatistic(roadStatistic: RoadStatistic) {
    this.selectRoadStatistic.emit(roadStatistic);
  }

}