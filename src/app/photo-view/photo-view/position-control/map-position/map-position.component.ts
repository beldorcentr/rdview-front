import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { environment } from 'environments/environment';

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
      .setView(environment.mapDefaultCenter, environment.mapDefaultZoom)
      .setMaxBounds(environment.mapBounds);

    L.tileLayer(environment.mapTitleLayerUrlTemplate, {
      attribution: environment.mapTitleLayerAttribution
    }).addTo(this.map);

    this.map.on('contextmenu', (event: any) => {
      const { lat, lng: lon } = event.latlng;
      this.selectPosition.emit({ lat, lon });
    });
  }
}
