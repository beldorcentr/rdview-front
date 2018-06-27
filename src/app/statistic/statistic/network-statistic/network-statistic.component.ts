import { Component, OnInit, Input } from '@angular/core';
import { NetworkStatisticByYear } from 'app/statistic/network-statistic-by-year';

@Component({
  selector: 'app-network-statistic',
  templateUrl: './network-statistic.component.html',
  styleUrls: ['./network-statistic.component.scss']
})
export class NetworkStatisticComponent implements OnInit {

  @Input() networkStatisticByYear: NetworkStatisticByYear;

  constructor() { }

  ngOnInit() {
  }

}
