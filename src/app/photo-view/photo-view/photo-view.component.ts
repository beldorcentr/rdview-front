import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { RdviewService, CurrentPosition, Passage, Photo } from 'rdview-service';
import { AuthService } from 'app/shared/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ToasterService } from 'angular2-toaster';
import { mouseWheelZoom, MouseWheelZoom  } from 'mouse-wheel-zoom';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { LoadingIndicatorService } from 'app/shared/loading-indicator/loading-indicator.service';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.scss']
})
export class PhotoViewComponent implements OnInit {
  photo: Photo;
  passages: Passage[];
  selectedPassage: Passage;
  position: CurrentPosition;

  roadName: string;
  roadId: number;
  km: number;
  lat: number;
  lon: number;
  azimuth: number;
  date: Date;

  isInited = false;
  isLoading = false;
  isSideBarOpen = true;

  private rdviewService: RdviewService;
  private authorizationHeader: string;

  private wheelZoom: MouseWheelZoom;

  private nextPhotoSubject = new Subject();
  private previousPhotoSubject = new Subject();
  private initPositionSubject = new Subject<CurrentPosition>();

  private nextPhoto$ = this.nextPhotoSubject.asObservable();
  private previousPhoto$ = this.previousPhotoSubject.asObservable();
  private initPosition$ = this.initPositionSubject.asObservable();

  private currentPosition$: Observable<CurrentPosition>;
  private newPhoto$: Observable<{ error?: any, blob?: Blob }>;

  @ViewChild('roadphoto') photoElement: ElementRef;

  constructor(private authService: AuthService,
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute,
      private toasterService: ToasterService,
      private loadingIndicatorService: LoadingIndicatorService) {

    this.initUserAuthData();

    this.authService.getIsAuthorized().subscribe((isAuthorized) => {
      if (!isAuthorized) {
        return;
      }
      this.initUserAuthData();
      this.initCurrentPositionStreams();
    });
  }

  toggleEnd(event: { isSideBarOpen: boolean }) {
    this.wheelZoom.reset();
    this.isSideBarOpen = event.isSideBarOpen;
  }

  initUserAuthData() {
    this.authorizationHeader = this.authService.getAuthorizationHeader();

    this.rdviewService = new RdviewService({
      apiUrl: environment.apiUrl,
      authorization: this.authorizationHeader
    });
  }

  initCurrentPositionStreams() {
    this.currentPosition$ = merge(
      this.initPosition$,
      this.nextPhoto$.flatMap(() =>
        Observable.fromPromise(this.rdviewService.getNextPhoto())
      ),
      this.previousPhoto$.flatMap(() =>
        Observable.fromPromise(this.rdviewService.getPreviousPhoto())
      )
    ).share();

    this.currentPosition$.subscribe(
      currentPosition => this.handleNewPosition(currentPosition),
      err => this.showMovementError(err)
    );

    this.newPhoto$ = this.currentPosition$
      .pipe(
        switchMap((p: any) => {
          return new Observable(observer => {
            this.http.get(p.currentPhoto.imgUrl, {
              headers: new HttpHeaders()
                .set('Authorization', this.authorizationHeader),
              responseType: 'blob'
            }).subscribe(blob => {
              observer.next({
                blob
              });
            }, error => {
              observer.next({
                error
              });
            });
          });
        })
      );

    this.newPhoto$.subscribe(photo => {
      if (photo.error) {
        this.showImageLoadingError(photo.error);
      } else {
        this.wheelZoom.setSrcAndReset(URL.createObjectURL(photo.blob));
      }
    });
  }

  ngOnInit() {
    this.wheelZoom = mouseWheelZoom({ element: this.photoElement.nativeElement });
    this.initPositionFromUrl();
  }

  initPositionFromUrl() {
    this.route.queryParams.subscribe(params => {
      const roadId = +params['roadId'];
      const km = +params['km'];
      const year = +params['year'];
      const direction = params['direction'];

      if (roadId) {
        this.initByRoad({
          roadId,
          km,
          year,
          direction
        });
        return;
      }

      const lat = params['lat'];
      const lon = params['lon'];

      if (lon != null && lat != null) {
        this.initByCoordinates({
          lat: +lat,
          lon: +lon
        });
      }
    });
  }

  nextPhoto() {
    this.nextPhotoSubject.next();
  }

  previousPhoto() {
    this.previousPhotoSubject.next();
  }

  handleNewPosition(position: CurrentPosition) {
    this.loadingIndicatorService.isLoading = false;

    if (!position || position.isEmptyResult) {
      this.toasterService.pop('info', 'Пустой ответ сервера');
      return;
    }

    this.position = position;
    this.photo = position.currentPhoto;

    this.lat = this.photo.lat;
    this.lon = this.photo.lon;
    this.azimuth = this.photo.azimuth;

    this.roadName = position.road.name;
    this.roadId = position.road.id;
    this.km = position.currentPhoto.km;
    this.date = position.currentPhoto.date;

    this.passages = position.closeToCurrentPassages
      .sort((p1, p2) => {
        // for same day forward direction should be first
        if (p1.date.getFullYear() === p2.date.getFullYear() &&
            p1.date.getMonth() === p2.date.getMonth() &&
            p1.date.getDate() === p2.date.getDate()) {
          return p1.direction === 'forward' ? -1 : 1;
        }
        return p2.date.getTime() - p1.date.getTime();
      });
    this.selectedPassage = position.currentPassage;

    this.isInited = true;

    if (position.isNoNewPhoto) {
      this.toasterService.pop('info', 'Нет фото', 'Для текущего сегмента больше нет фотографий');
      return;
    }
  }

  selectPassage(event: { passageId: string, km: number }) {
    this.rdviewService.setPassage(event.passageId, event.km)
      .then(currentPosition => this.initPositionSubject.next(currentPosition),
        err => this.showMovementError(err));
  }

  initByCoordinates({ lat, lon }: { lat: number, lon: number}) {
    this.loadingIndicatorService.isLoading = true;
    this.rdviewService.initByCoordinates(lat, lon)
      .then(currentPosition => {
        if (currentPosition.isEmptyResult) {
          this.showEmptyResultError();
          return;
        }
        this.initPositionSubject.next(currentPosition);
      }, err => this.showInitError(err));
  }

  initByRoad({ roadId, km, year, direction }: { roadId: number, km: number, year?: number, direction?: 'forward' | 'backward' }) {
    this.loadingIndicatorService.isLoading = true;
    this.rdviewService.initByRoad(roadId, km)
      .then(currentPosition => {
        if (currentPosition.isEmptyResult) {
          this.showEmptyResultError();
          return;
        }
        if (year || direction) {
          const selectedPassage = currentPosition.passages
            .find(p => (year == null || p.date.getFullYear() === year) &&
              (direction == null || p.direction === direction) &&
              (!!km || (p.beginKm <= km && km <= p.endKm)));

          if (selectedPassage) {
            this.rdviewService.setPassage(selectedPassage.id, km)
              .then(position => this.initPositionSubject.next(position));
            return;
          }
        }
        this.initPositionSubject.next(currentPosition);
      }, err => this.showInitError(err));
  }

  showInitError(err) {
    this.handleAuthLoadingError(err);
    this.loadingIndicatorService.isLoading = false;
    this.toasterService.pop('error', 'Ошибка связи с сервером');
  }

  showEmptyResultError() {
    this.loadingIndicatorService.isLoading = false;
    this.toasterService.pop('info', 'В выбранном месте нет фотографий');
  }

  showMovementError(err) {
    this.handleAuthLoadingError(err);
    this.toasterService.pop('error', 'Ошибка выбора новой фотографии');
  }

  showImageLoadingError(err) {
    this.handleAuthLoadingError(err);
    this.toasterService.pop('error', 'Ошибка загрузки фотографии');
  }

  handleAuthLoadingError(err) {
    if (!err) {
      return;
    }

    const status = err.response ?
      err.response.status :
      err.status;

    if (!status) {
      return;
    }

    switch (status) {
      case 401:
        this.router.navigate(['/login']);
        break;
      case 403:
        this.router.navigate(['/forbidden']);
        break;
      default:
    }
  }
}
