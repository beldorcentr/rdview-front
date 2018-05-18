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

  wheelZoom: MouseWheelZoom;

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

  ngOnInit() {
    this.wheelZoom = mouseWheelZoom({ element: this.photoElement.nativeElement });
  }

  nextPhoto() {
    this.rdviewService.getNextPhoto()
      .then(currentPosition => this.handleNewPosition(currentPosition),
        err => this.showMovementError(err));
  }

  previousPhoto() {
    this.rdviewService.getPreviousPhoto()
      .then(currentPosition => this.handleNewPosition(currentPosition),
        err => this.showMovementError(err));
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

    this.passages = position.closeToCurrentPassages;
    this.selectedPassage = position.currentPassage;

    this.isInited = true;

    if (position.isNoNewPhoto) {
      this.toasterService.pop('info', 'Нет фото', 'Для текущего сегмента больше нет фотографий');
      return;
    }

    this.http.get(this.photo.imgUrl, {
      headers: new HttpHeaders()
        .set('Authorization', this.authorizationHeader),
      responseType: 'blob'
    }).toPromise()
      .then(response => {
        this.wheelZoom.setSrcAndReset(URL.createObjectURL(response));
      }, err => {
        this.showImageLoadingError(err);
        this.photoElement.nativeElement.removeAttribute('src');
      });
  }

  selectPassage(event: { passageId: string, km: number }) {
    this.rdviewService.setPassage(event.passageId, event.km)
      .then(currentPosition => this.handleNewPosition(currentPosition))
      .catch(err => this.showMovementError(err));
  }

  initByCoordinates({ lat, lon }: { lat: number, lon: number}) {
    this.isLoading = true;
    this.rdviewService.initByCoordinates(lat, lon)
      .then(currentPosition => this.handleNewPosition(currentPosition),
        err => this.showInitError(err));
  }

  initByRoad({ roadId, km }: { roadId: number, km: number }) {
    this.isLoading = true;
    this.rdviewService.initByRoad(roadId, km)
      .then(currentPosition => this.handleNewPosition(currentPosition),
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
