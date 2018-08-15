import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoadStatisticByYear } from 'app/statistic/road-statistic-by-year';
import { RoadStatistic } from 'app/statistic/road-statistic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-road-statistic',
  templateUrl: './road-statistic.component.html',
  styleUrls: ['./road-statistic.component.scss']
})
export class RoadStatisticComponent {

  @Input() roadStatisticByYear: RoadStatisticByYear;
  @Input() selectedRoadStatistic: RoadStatistic;
  @Output() selectRoadStatistic = new EventEmitter<RoadStatistic>();

  constructor(private router: Router) {

  }

  clickRoadStatistic(roadStatistic: RoadStatistic) {
    this.selectRoadStatistic.emit(roadStatistic);
  }

  viewRoadStatistic(roadStatistic: RoadStatistic) {
    this.router.navigate(['photoview'], {
      queryParams: {
        roadId: roadStatistic.idRd,
        km: (roadStatistic.rdEnd + roadStatistic.rdBeg) / 2,
        year: roadStatistic.yr,
        direction: roadStatistic.direction
      }
    });
  }

}
