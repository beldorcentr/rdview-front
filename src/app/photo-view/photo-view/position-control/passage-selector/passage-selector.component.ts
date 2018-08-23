import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Passage } from 'rdview-service';

@Component({
  selector: 'app-passage-selector',
  templateUrl: './passage-selector.component.html',
  styleUrls: ['./passage-selector.component.scss']
})
export class PassageSelectorComponent implements OnChanges {

  @Input() beginKm: number;
  @Input() endKm: number;
  @Input() currentKm: number;
  @Input() passages: Passage[];
  @Input() selectedPassage: Passage;
  @Output() selectPassage = new EventEmitter<{ passageId: string, km: number }>();

  get kmRange(): number {
    return this.endKm - this.beginKm;
  }

  tooltipPassage: Passage;
  tooltipX: number;
  tooltipY: number;
  tooltipKm: number;

  kmMarks: number[];

  private minWidthPartToDisplayPassageDate = .3;

  ngOnChanges() {
    const numberOfKmMarksInPassages = Math.floor(this.endKm) - Math.ceil(this.beginKm) + 1;
    this.kmMarks = Array.from(Array(numberOfKmMarksInPassages).keys())
      .map(km => km + Math.ceil(this.beginKm));
  }

  onMouseEnter(passage: Passage) {
    this.tooltipPassage = passage;
  }

  onMouseMove(mouseEvent) {
    this.tooltipKm = this.getSelectedKm(mouseEvent);
    this.tooltipX = mouseEvent.clientX;
    this.tooltipY = mouseEvent.clientY;
  }

  onMouseLeave() {
    this.tooltipPassage = null;
  }

  onMouseClick(mouseEvent) {
    this.selectPassage.emit({
      passageId: this.tooltipPassage.id,
      km: this.getSelectedKm(mouseEvent)
    });
  }

  getPercentLeftDistanceForPassage(passage: Passage) {
    return (passage.beginKm - this.beginKm) * 100 / this.kmRange;
  }

  getPercentLeftDistanceForKm(km: number) {
    return (km - this.beginKm) * 100 / this.kmRange;
  }

  getPercentWidthDistanceForKm(km: number) {
    return km * 100 / this.kmRange;
  }

  isDisplayDateForPassage(passage: Passage): boolean {
    return (passage.endKm - passage.beginKm) / this.kmRange >
      this.minWidthPartToDisplayPassageDate;
  }

  private getSelectedKm(mouseEvent): number {
    const widthPart = mouseEvent.layerX / mouseEvent.target.clientWidth;
    return this.tooltipPassage.beginKm + widthPart * (
      this.tooltipPassage.endKm - this.tooltipPassage.beginKm);
  }
}
