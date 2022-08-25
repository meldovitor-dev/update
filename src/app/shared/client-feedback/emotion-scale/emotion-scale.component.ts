import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'tecvirt-emotion-scale',
  templateUrl: './emotion-scale.component.html',
  styleUrls: ['./emotion-scale.component.scss']
})
export class EmotionScaleComponent implements OnInit, OnChanges {
  imagePath = './assets/icon/success-page/';
  emotionList = [
    {icon: this.imagePath + 'nota1.svg', feedback: '1', gaAction: 'muito_insatisfeito', label: 'Muito<br>Insatisfeito'},
    {icon: this.imagePath + 'nota2.svg', feedback: '2', gaAction: 'insatisfeito', label: 'Insatisfeito'},
    {icon: this.imagePath + 'nota3.svg', feedback: '3', gaAction: 'indiferente', label: 'Indiferente'},
    {icon: this.imagePath + 'nota4.svg', feedback: '4', gaAction: 'satisfeito', label: 'Satisfeito'},
    {icon: this.imagePath + 'nota5.svg', feedback: '5', gaAction: 'muito_satisfeito', label: 'Muito<br>Satisfeito'},
  ]
  currentSelected;
  @Output() scaleEvt = new EventEmitter<any>();
  @Input() currentPage;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.currentSelected = null;
  }
  onClick(item) {
    this.currentSelected = item;
    this.scaleEvt.emit(this.currentSelected);
  }
}
