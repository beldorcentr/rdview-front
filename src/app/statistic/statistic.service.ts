import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/shared/auth/auth.service';
import { NetworkStatistic } from './network-statistic';
import { RoadType } from './road-type';
import { NetworkStatisticByYear } from './network-statistic-by-year';
import { RoadStatistic } from './road-statistic';
import { RoadStatisticByYear } from './road-statistic-by-year';

@Injectable()
export class StatisticService {

  private roadTypePriority = [
    { type: RoadType.Republican, priority: 100 },
    { type: RoadType.Regional, priority: 90 },
    { type: RoadType.Local, priority: 80 }
  ];

  private statisticUrl = 'api/v1/statistic';

  get headers() {
    return new HttpHeaders({
      'Authorization': this.authService.getAuthorizationHeader()
    });
  }

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getNetworkStatistic(): Promise<NetworkStatistic[]> {
    return this.http.get<NetworkStatistic[]>(this.statisticUrl, {
      headers: this.headers
    }).toPromise();
  }

  getNetworkStatisticByYear(): Promise<NetworkStatisticByYear> {
    return this.getNetworkStatistic().then(networkStatistic => {
      const statisticByYear = this.getStatisticYears(networkStatistic)
        .map(year => networkStatistic
          .filter(s => s.yr === year)
          .sort((s1, s2) => this.getPriorityForRoadType(s2.roadType) -
            this.getPriorityForRoadType(s1.roadType)))
        .map(currentYearNetworkStatistic => ({
            year: currentYearNetworkStatistic[0].yr,
            totalPhotos: this.getTotalPhotos(currentYearNetworkStatistic),
            totalKm: this.getTotalKmLength(currentYearNetworkStatistic),
            networkStatistic: currentYearNetworkStatistic
          })
        );

      return {
        totalKm : this.getTotalKmLength(networkStatistic),
        totalPhotos: this.getTotalPhotos(networkStatistic),
        networkStatistic,
        statisticByYear
      };
    });
  }

  getRoadStatistic(roadId: number): Promise<RoadStatistic[]> {
    return this.http.get<RoadStatistic[]>(this.statisticUrl, {
      headers: this.headers,
      params: {
        roadId: roadId.toString()
      }
    }).toPromise()
      .then(s => s.map(rs => this.mapRoadStatistic(rs)));
  }

  getRoadStatisticByYear(roadId: number): Promise<RoadStatisticByYear> {
    return this.getRoadStatistic(roadId)
      .then(roadStatistic => {
        const statisticByYear = this.getStatisticYears(roadStatistic)
          .map(year => roadStatistic.filter(s => s.yr === year))
          .map(currentYearNetworkStatistic => ({
              year: currentYearNetworkStatistic[0].yr,
              totalPhotos: this.getTotalPhotos(currentYearNetworkStatistic),
              totalKm: this.getTotalKmRangeLength(currentYearNetworkStatistic),
              roadStatistic: currentYearNetworkStatistic
            })
          );

        return {
          totalKm: this.getTotalKmRangeLength(roadStatistic),
          totalPhotos: this.getTotalPhotos(roadStatistic),
          roadStatistic,
          statisticByYear
        };
      });
  }

  private mapRoadStatistic(rs: RoadStatistic): RoadStatistic {
    rs.kmLength = rs.rdEnd - rs.rdBeg;
    return rs;
  }

  private getPriorityForRoadType(roadType: RoadType): number {
    return this.roadTypePriority
      .find(p => p.type === roadType)
      .priority;
  }

  private getTotalKmLength(statistic: { kmLength: number }[]): number {
    return statistic.reduce((acc, cur) => acc + cur.kmLength, 0);
  }

  private getTotalKmRangeLength(statistic: { rdBeg: number, rdEnd: number}[]) {
    return statistic.reduce((acc, cur) => acc + cur.rdEnd - cur.rdBeg, 0);
  }

  private getTotalPhotos(statistic: { photosCount: number }[]): number {
    return statistic.reduce((acc, cur) => acc + cur.photosCount, 0);
  }

  private getStatisticYears(statistic: { yr: number }[]): number[] {
    return Array.from(new Set([...statistic.map(s => s.yr)]));
  }
}
