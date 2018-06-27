import { Component, OnInit, TemplateRef } from '@angular/core';
import { StatisticService } from 'app/statistic/statistic.service';
import { NetworkStatisticByYear } from 'app/statistic/network-statistic-by-year';
import { RoadStatisticByYear } from 'app/statistic/road-statistic-by-year';
import { RoadStatistic } from 'app/statistic/road-statistic';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Road } from 'rdview-service';
import { LoadingIndicatorService } from 'app/shared/loading-indicator/loading-indicator.service';
import { ToasterService } from 'angular2-toaster';

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
    private modalService: BsModalService,
    private toasterService: ToasterService,
    private loadingIndicatorService: LoadingIndicatorService) { }

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
    this.loadingIndicatorService.isLoading = true;
    this.statisticService.getRoadStatisticByYear(road.id)
      .then(roadStatisticByYear => {
        this.loadingIndicatorService.isLoading = false;
        this.roadStatisticByYear = roadStatisticByYear;
        this.roadStatistic = roadStatisticByYear.roadStatistic;
      }, err => {
        this.loadingIndicatorService.isLoading = false;
        this.toasterService.pop('error', 'Ошибка загрузки данных по дороге');
      });
  }

}
