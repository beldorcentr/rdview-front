import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { RoadStatistic } from 'app/statistic/road-statistic';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-road-statistic-map',
  templateUrl: './road-statistic-map.component.html',
  styleUrls: ['./road-statistic-map.component.scss']
})
export class RoadStatisticMapComponent implements OnInit, OnChanges {

  private map;
  private roadParts: L.GeoJSON[];

  @Input() roadStatistic: RoadStatistic[];
  @Input() selectedRoadStatistic: RoadStatistic;
  @Output() selectRoadStatistic = new EventEmitter<RoadStatistic>();

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges() {
    if (Array.isArray(this.roadParts)) {
      this.roadParts.forEach(rp => rp.remove());
    }

    if (!Array.isArray(this.roadStatistic)) {
      return;
    }

    this.roadParts = this.roadStatistic
      .filter(rs => rs !== this.selectedRoadStatistic)
      .map(rs => this.createRoadGeoJson(rs, false))
      .filter(rs => !!rs);

    let currentStatisticBounds;
    // zIndex has no effect on vector objects.
    // add as last element to be on top
    if (this.selectedRoadStatistic) {
      const selectedRoadPart = this.createRoadGeoJson(this.selectedRoadStatistic, true);
      this.roadParts.push(selectedRoadPart);
      currentStatisticBounds = selectedRoadPart.getBounds();
    } else {
      const roadPartsFeatureGroup = L.featureGroup(this.roadParts);
      currentStatisticBounds = L.featureGroup(this.roadParts).getBounds();
    }

    if (!this.map.getBounds().contains(currentStatisticBounds)) {
      this.map.fitBounds(currentStatisticBounds);
    }
  }

  private initializeMap() {
    this.map = L.map('statistic-map')
      .setView(environment.mapDefaultCenter, environment.mapDefaultZoom)
      .setMaxBounds(environment.mapBounds);

    L.tileLayer(environment.mapTitleLayerUrlTemplate, {
      attribution: environment.mapTitleLayerAttribution
    }).addTo(this.map);
  }

  private createRoadGeoJson(rs: RoadStatistic, isSelected: boolean): L.GeoJSON {
    const style = {
      color: isSelected ? 'red' : 'yellow',
      weight: '8'
    };

    const geoJson = {
      type: 'Feature',
      geometry: JSON.parse(rs.geometry)
    };

    if (!geoJson.geometry || (geoJson.geometry.type !== 'LineString' &&
        geoJson.geometry.type !== 'MultiLineString')) {
      return;
    }

    return L.geoJSON(geoJson as any, {
      style: style as any
    }).bindPopup(this.createPopupText(rs))
      .on('click', () => this.selectRoadStatistic.emit(rs))
      .addTo(this.map);
  }

  private createPopupText(rs: RoadStatistic): string {
    return `${rs.yr} год ${rs.rdBeg} км - ${rs.rdEnd} км ${rs.photosCount} фотографий`;
  }
}
