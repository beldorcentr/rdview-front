import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Passage, CurrentPosition } from 'rdview-service';

@Component({
  selector: 'app-position-control',
  templateUrl: './position-control.component.html',
  styleUrls: ['./position-control.component.scss']
})
export class PositionControlComponent {

  @Input() isInited: boolean;
  @Input() lat: number;
  @Input() lon: number;
  @Input() azimuth: number;
  @Input() roadId: number;
  @Input() roadName: string;
  @Input() km: number;
  @Input() passages: Passage[];
  @Input() selectedPassage: Passage;
  @Input() position: CurrentPosition;

  @Output() initByCoordinates = new EventEmitter<{ lat: number, lon: number}>();
  @Output() initByRoad = new EventEmitter<{ roadId: number, km?: number }>();
  @Output() nextPhoto = new EventEmitter();
  @Output() previousPhoto = new EventEmitter();
  @Output() selectPassage = new EventEmitter<{ passageId: string, km: number }>();

  emitInitByCoordinates(event: { lat: number, lon: number}) {
    this.initByCoordinates.emit(event);
  }

  emitInitByRoad(event: { roadId: number, km?: number }) {
    this.initByRoad.emit(event);
  }

  emitNextPhoto() {
    this.nextPhoto.emit();
  }

  emitPreviousPhoto() {
    this.previousPhoto.emit();
  }

  emitSelectPassage(event: { passageId: string, km: number }) {
    this.selectPassage.emit(event);
  }
}