import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { RoadStatistic } from 'app/statistic/road-statistic';

const MAP_DEFAULT_ZOOM = 6;
const MAP_DEFAULT_CENTER = L.latLng(53.5, 28);
const MAP_BOUNDS = L.latLngBounds(L.latLng(40, 10), L.latLng(70, 50));
const MAP_TILE_LAYER_URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_ATTRIBUTION = '&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,&nbsp;';

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
      .map(rs => this.createRoadGeoJson(rs, false));

    // zIndex has no effect on vector objects.
    // add as last element to be on top
    if (this.selectedRoadStatistic) {
      this.roadParts.push(this.createRoadGeoJson(this.selectedRoadStatistic, true));
    }
  }

  private initializeMap() {
    this.map = L.map('statistic-map')
      .setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM)
      .setMaxBounds(MAP_BOUNDS);

    L.tileLayer(MAP_TILE_LAYER_URL_TEMPLATE, {
      attribution: MAP_TILE_LAYER_ATTRIBUTION
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
