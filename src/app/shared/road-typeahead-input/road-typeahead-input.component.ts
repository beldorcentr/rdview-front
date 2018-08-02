import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { RoadService, Road } from 'rdview-service';
import { AuthService } from 'app/shared/auth/auth.service';
import { environment } from 'environments/environment';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'app-road-typeahead-input',
  templateUrl: './road-typeahead-input.component.html',
  styleUrls: ['./road-typeahead-input.component.scss']
})
export class RoadTypeaheadInputComponent implements OnChanges {

  @Input() roadName: string;
  @Output() selectRoad = new EventEmitter<Road>();
  @Output() enterKeyup = new EventEmitter();

  isDisplayAutocompletePopup = false;
  isAutocompleteLoading = false;
  isLoadingError = false;

  asyncSelectedRoad: string;
  isTypeaheadLoading: boolean;
  isTypeaheadNoResults: boolean;
  roadDataSource: Observable<Road[]>;

  private roadService: RoadService;
  private selectedRoad: Road;

  changeTypeaheadLoading(e: boolean): void {
    this.isTypeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.isTypeaheadNoResults = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.selectedRoad = e.item;
    this.asyncSelectedRoad = e.item.name;
    this.selectRoad.emit(this.selectedRoad);
  }

  constructor(private authService: AuthService) {
    this.roadService = new RoadService({
      apiUrl: environment.apiUrl,
      authorization: this.authService.getAuthorizationHeader()
    });

    this.roadDataSource = Observable.create((observer: any) => {
      this.roadService.getRoads(this.asyncSelectedRoad)
        .then(result => {
          this.isLoadingError = false;
          observer.next(result);
        }, err => {
          this.isTypeaheadLoading = false;
          this.isLoadingError = true;
        });
    });
  }

  ngOnChanges(changes): void {
    this.asyncSelectedRoad = this.roadName;
  }

  enterUp() {
    this.enterKeyup.emit();
  }
}
