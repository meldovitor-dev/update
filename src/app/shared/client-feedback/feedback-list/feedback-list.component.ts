import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tecvirt-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  @Input() listArray = [];
  @Output() feedbackEvt = new EventEmitter<any>();
  feedback;
  constructor() { }

  ngOnInit() {
  }

  getData(evt) {
    if (!this.feedback) {
      return;
    }
    this.feedbackEvt.emit({gaAction: this.feedback});
  }

}
