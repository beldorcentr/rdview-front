export interface RoadStatistic {
  idRd: number;
  yr: number;
  direction: 'forward' | 'backward';
  photosCount: number;
  rdBeg: number;
  rdEnd: number;
  kmLength: number;
  geometry: string;
}
