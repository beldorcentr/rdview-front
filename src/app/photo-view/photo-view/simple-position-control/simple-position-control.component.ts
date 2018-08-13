import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-position-control',
  templateUrl: './simple-position-control.component.html',
  styleUrls: ['./simple-position-control.component.scss']
})
export class SimplePositionControlComponent {

  @Input() isInited: boolean;
  @Input() roadName: string;
  @Input() km: number;
  @Input() lat: number;
  @Input() lon: number;
  @Input() date: Date;

  @Output() nextPhoto = new EventEmitter();
  @Output() previousPhoto = new EventEmitter();

  emitNextPhoto() {
    this.nextPhoto.emit();
  }

  emitPreviousPhoto() {
    this.previousPhoto.emit();
  }

}
