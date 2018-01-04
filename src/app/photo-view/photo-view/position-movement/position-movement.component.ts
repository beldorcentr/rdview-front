import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-position-movement',
  templateUrl: './position-movement.component.html',
  styleUrls: ['./position-movement.component.scss']
})
export class PositionMovementComponent {

  @Input() isInited: boolean;
  @Output() previousPhoto = new EventEmitter();
  @Output() nextPhoto = new EventEmitter();

  movingForwardInterval;
  movingBackwardInterval;
  movingIntervalMs = 1000;
  movingMultiplySpeed = 1;

  get isMoving(): boolean {
    return this.isMovingForward || this.isMovingBackward;
  }

  get isMovingForward(): boolean {
    return this.movingForwardInterval != null;
  }

  get isMovingBackward(): boolean {
    return this.movingBackwardInterval != null;
  }

  get intervalSpeedMs(): number {
    return this.movingIntervalMs / this.movingMultiplySpeed;
  }

  constructor() { }

  previous() {
    this.previousPhoto.emit();
  }

  next() {
    this.nextPhoto.emit();
  }

  stop() {
    this.movingMultiplySpeed = 1;

    if (this.isMovingForward) {
      this.clearMovingForwardInterval();
    }

    if (this.isMovingBackward) {
      this.clearMovingBackwardInterval();
    }
  }

  startMovingForward() {
    if (this.isMovingBackward) {
      this.clearMovingBackwardInterval();
      this.resetMultiplySpeed();
    }

    if (this.isMovingForward) {
      this.clearMovingForwardInterval();
      this.increaseMultiplySpeed();
    }

    this.movingForwardInterval = setInterval(() => this.next(), this.intervalSpeedMs);
  }

  startMovingBackward() {
    if (this.isMovingForward) {
      this.clearMovingForwardInterval();
      this.resetMultiplySpeed();
    }

    if (this.isMovingBackward) {
      this.clearMovingBackwardInterval();
      this.increaseMultiplySpeed();
    }

    this.movingBackwardInterval = setInterval(() => this.previous(), this.intervalSpeedMs);
  }

  private resetMultiplySpeed() {
    this.movingMultiplySpeed = 1;
  }

  private increaseMultiplySpeed() {
    this.movingMultiplySpeed = this.movingMultiplySpeed < 4 ?
      this.movingMultiplySpeed * 2 :
      1;
  }

  private clearMovingBackwardInterval() {
    clearInterval(this.movingBackwardInterval);
    this.movingBackwardInterval = null;
  }

  private clearMovingForwardInterval() {
    clearInterval(this.movingForwardInterval);
    this.movingForwardInterval = null;
  }
}
