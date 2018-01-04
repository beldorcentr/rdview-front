import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';

const MAP_DEFAULT_ZOOM = 6;
const MAP_DEFAULT_CENTER = L.latLng(53.5, 28);
const MAP_BOUNDS = L.latLngBounds(L.latLng(40, 10), L.latLng(70, 50));
const MAP_TILE_LAYER_URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_ATTRIBUTION = '&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,&nbsp;';

const arrowIcon = L.icon({
  iconUrl: require('assets/marker-arrow.png'),
  iconSize: [30, 40],
  iconAnchor: [15, 20]
});

@Component({
  selector: 'app-map-position',
  templateUrl: './map-position.component.html',
  styleUrls: ['./map-position.component.scss']
})
export class MapPositionComponent implements OnInit, OnChanges {

  @Input() isInited: boolean;
  @Input() lat: number;
  @Input() lon: number;
  @Input() azimuth: number;
  @Output() selectPosition = new EventEmitter<{ lat: number, lon: number}>();

  private map;
  private marker;

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(changes): void {
    if (this.marker) {
      this.marker.remove();
    }

    if (!this.isInited) {
      return;
    }

    this.marker = L.marker([this.lat, this.lon], {
      icon: arrowIcon,
      rotationAngle: this.azimuth
    } as any).addTo(this.map);

    this.map.panTo([ this.lat, this.lon ]);
  }

  private initializeMap() {
    this.map = L.map('map')
      .setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM)
      .setMaxBounds(MAP_BOUNDS);

    L.tileLayer(MAP_TILE_LAYER_URL_TEMPLATE, {
      attribution: MAP_TILE_LAYER_ATTRIBUTION
    }).addTo(this.map);

    this.map.on('contextmenu', (event: any) => {
      const { lat, lng: lon } = event.latlng;
      this.selectPosition.emit({ lat, lon });
    });
  }
}
