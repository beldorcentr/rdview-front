import { NetworkStatistic } from './network-statistic';

export interface NetworkStatisticByYear {
  totalKm: number;
  totalPhotos: number;
  networkStatistic: NetworkStatistic[];
  statisticByYear: {
    year: number;
    totalKm: number;
    totalPhotos: number;
    networkStatistic: NetworkStatistic[];
  }[];
}
