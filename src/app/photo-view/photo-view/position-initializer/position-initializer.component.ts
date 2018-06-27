import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { RoadService, Road } from 'rdview-service';
import { AuthService } from 'app/shared/auth/auth.service';
import { environment } from 'environments/environment';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

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

  asyncSelectedRoad: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  roadDataSource: Observable<Road[]>;

  private roadService: RoadService;

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.asyncSelectedRoad = e.item.name;
    this.roadId = e.item.id;
  }

  constructor(private authService: AuthService) {
    this.roadService = new RoadService({
      apiUrl: environment.apiUrl,
      authorization: this.authService.getAuthorizationHeader()
    });

    this.roadDataSource = Observable.create((observer: any) => {
      this.roadService.getRoads(this.asyncSelectedRoad)
        .then(result => observer.next(result));
    });
  }

  ngOnChanges(changes): void {
    this.asyncSelectedRoad = this.roadName;
  }

  initByCoords() {
    this.selectCoordinates.emit({
      lat: this.lat || 0,
      lon: this.lon || 0
    });
  }

  initByRoad() {
    this.selectRoad.emit({
      roadId: this.roadId,
      km: this.km || 0
    });
  }

  clearRoad() {
    this.asyncSelectedRoad = null;
  }

  selectCurrentRoad(road: Road) {
    this.roadId = road.id;
  }
}
