import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit {
  @Input() optionsArray = [];
  @Output() buttonClickedEvt = new EventEmitter<any>();
  optionActive;
  MAX_SIZE = 12;
  constructor(public analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

  imageSelection(option) {
    if ( this.optionActive === option) {
      return;
    }
    this.optionActive = option;
    this.analyticsService.logEventGA(option.gaName, 'click');
  }

  shoudBeDeselected(option) {
    return this.optionActive && option !== this.optionActive;
  }

  getColumnSize() {
    if (!this.optionsArray) {
      return this.MAX_SIZE;
    }
    return Math.floor(this.MAX_SIZE / this.optionsArray.length);
  }

  clickEvent(evt) {
    const { stateName } = this.optionActive;
    this.buttonClickedEvt.emit(stateName);
  }
}
