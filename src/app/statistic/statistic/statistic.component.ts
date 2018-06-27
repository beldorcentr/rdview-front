import { Component, OnInit, TemplateRef } from '@angular/core';
import { StatisticService } from '../statistic.service';
import { NetworkStatisticByYear } from '../network-statistic-by-year';
import { RoadStatisticByYear } from '../road-statistic-by-year';
import { RoadStatistic } from '../road-statistic';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Road } from 'rdview-service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  networkStatisticByYear: NetworkStatisticByYear;
  roadStatisticByYear: RoadStatisticByYear;

  selectedRoadStatistic: RoadStatistic;
  roadStatistic: RoadStatistic[];

  modalRef: BsModalRef;

  constructor(private statisticService: StatisticService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.statisticService.getNetworkStatisticByYear()
      .then(networkStatisticByYear => {
        this.networkStatisticByYear = networkStatisticByYear;
      });
  }

  selectRoadStatistic(roadStatistic: RoadStatistic) {
    this.selectedRoadStatistic = roadStatistic;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectRoad(road: Road) {
    this.statisticService.getRoadStatisticByYear(road.id)
      .then(roadStatisticByYear => {
        this.roadStatisticByYear = roadStatisticByYear;
        this.roadStatistic = roadStatisticByYear.roadStatistic;
      });
  }

}
