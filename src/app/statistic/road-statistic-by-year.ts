import { RoadStatistic } from './road-statistic';

export interface RoadStatisticByYear {
  totalKm: number;
  totalPhotos: number;
  roadStatistic: RoadStatistic[];
  statisticByYear: {
    year: number;
    totalKm: number;
    totalPhotos: number;
    roadStatistic: RoadStatistic[];
  }[];
}
