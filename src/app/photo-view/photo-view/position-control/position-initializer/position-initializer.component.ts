import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Road } from 'rdview-service';



@Component({
  selector: 'app-position-initializer',
  templateUrl: './position-initializer.component.html',
  styleUrls: ['./position-initializer.component.scss']
})
export class PositionInitializerComponent implements OnChanges {

  @Input() roadName: string;
  @Input() roadId: number;
  @Input() km: number;
  @Input() lat: number;
  @Input() lon: number;
  @Input() isInited: boolean;
  @Output() selectRoad = new EventEmitter<{ roadId: number, km: number }>();
  @Output() selectCoordinates = new EventEmitter<{ lat: number, lon: number }>();

  isDisplayAutocompletePopup = false;
  isAutocompleteLoading = false;

  selectedKm: number;
  selectedRoad: string;
  selectedRoadId: number;
  selectedLat: number;
  selectedLon: number;

  ngOnChanges(): void {
    this.selectedRoad = this.roadName;
    this.selectedKm = this.km;
    this.selectedLat = this.lat;
    this.selectedLon = this.lon;
  }

  initByCoords() {
    this.selectCoordinates.emit({
      lat: this.selectedLat || this.lat || 0,
      lon: this.selectedLon || this.lon || 0
    });
  }

  initByRoad() {
    this.selectRoad.emit({
      roadId: this.selectedRoadId || this.roadId,
      km: this.selectedKm || 0
    });
  }

  clearRoad() {
    this.selectedRoad = null;
    this.selectedRoadId = null;
    this.selectedKm = null;
  }

  clearCoordinates() {
    this.selectedLat = null;
    this.selectedLon = null;
  }

  selectCurrentRoad(road: Road) {
    this.selectedRoad = road.name;
    this.selectedRoadId = road.id;
  }
}
