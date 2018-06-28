import { Component } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent {

  get isLoading(): boolean {
    return this.loadingIndicatorService.isLoading;
  }

  constructor(private loadingIndicatorService: LoadingIndicatorService) { }

}
