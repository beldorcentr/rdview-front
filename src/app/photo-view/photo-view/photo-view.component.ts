import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {
  RdviewService, CurrentPosition,
  Road, Segment, Passage, Photo, RoadService
} from 'rdview-service';
import { AuthService } from '../../shared/auth/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ToasterService } from 'angular2-toaster';
import { mouseWheelZoom, MouseWheelZoom  } from 'mouse-wheel-zoom';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap, mapTo } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operator/map';

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

  isInited = false;
  isLoading = false;

  private rdviewService: RdviewService;
  private roadService: RoadService;
  private authorizationHeader: string;

  private wheelZoom: MouseWheelZoom;

  private nextPhotoSubject = new Subject();
  private previousPhotoSubject = new Subject();
  private initPositionSubject = new Subject<CurrentPosition>();

  private nextPhoto$ = this.nextPhotoSubject.asObservable();
  private previousPhoto$ = this.previousPhotoSubject.asObservable();
  private initPosition$ = this.initPositionSubject.asObservable();

  private currentPosition$: Observable<CurrentPosition>;
  private photoBlob$: Observable<Blob>;

  @ViewChild('roadphoto') photoElement: ElementRef;

  constructor(private authService: AuthService,
      private http: HttpClient,
      private router: Router,
      private toasterService: ToasterService) {

    this.initUserAuthData();

    this.authService.getIsAuthorized().subscribe((isAuthorized) => {
      if (!isAuthorized) {
        return;
      }
      this.initUserAuthData();
      this.initCurrentPositionStreams();
    });
  }

  initUserAuthData() {
    this.authorizationHeader = this.authService.getAuthorizationHeader();

    this.roadService = new RoadService({
      authorization: this.authorizationHeader
    });

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
    );

    this.currentPosition$.subscribe(
      currentPosition => this.handleNewPosition(currentPosition),
      err => this.showMovementError(err)
    );

    this.photoBlob$ = this.currentPosition$.pipe(
      switchMap(p => this.http.get(p.currentPhoto.imgUrl, {
          headers: new HttpHeaders()
            .set('Authorization', this.authorizationHeader),
          responseType: 'blob'
        })
      )
    );

    this.photoBlob$.subscribe(response => {
      this.wheelZoom.setSrcAndReset(URL.createObjectURL(response));
    }, err => {
      this.showImageLoadingError(err);
      this.photoElement.nativeElement.removeAttribute('src');
    });
  }

  ngOnInit() {
    this.wheelZoom = mouseWheelZoom({ element: this.photoElement.nativeElement });
  }

  nextPhoto() {
    this.nextPhotoSubject.next();
  }

  previousPhoto() {
    this.previousPhotoSubject.next();
  }

  handleNewPosition(position: CurrentPosition) {
    this.isLoading = false;

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

    this.passages = position.closeToCurrentPassages
      .sort((p1, p2) => {
        // for same day forward direction should be first
        if (p1.date.getFullYear() === p2.date.getFullYear() &&
            p1.date.getMonth() === p2.date.getMonth() &&
            p1.date.getDate() === p2.date.getDate()) {
          if (p1.direction === 'forward') {
            return -1;
          }
          return 1;
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
    this.isLoading = true;
    this.rdviewService.initByCoordinates(lat, lon)
      .then(currentPosition => this.initPositionSubject.next(currentPosition),
        err => this.showInitError(err));
  }

  initByRoad({ roadId, km }: { roadId: number, km: number }) {
    this.isLoading = true;
    this.rdviewService.initByRoad(roadId, km)
      .then(currentPosition => this.initPositionSubject.next(currentPosition),
        err => this.showInitError(err));
  }

  showInitError(err) {
    this.handleAuthLoadingError(err);
    this.isLoading = false;
    this.toasterService.pop('error', 'Ошибка связи с сервером');
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
    if (!err || !err.response) {
      return;
    }
    switch (err.response.status) {
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
