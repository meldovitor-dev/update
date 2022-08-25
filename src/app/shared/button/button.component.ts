import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'tecvirt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() label?;
  @Input() disabled?;
  @Input() letter?;
  @Input() color?;
  @Input() icon?;
  @Input() ionIcon?;
  @Input() size?;
  @Input() outline?;
  @Input() data?: any;
  @Input() troubleshooting?;
  @Input() loading?;
  @Output() clickEvent = new EventEmitter<any>();
  typeButton = {default: false, icon: false, alpha: false, outline: false, troubleshooting: false, loading: false};
  constructor() { }

  ngOnInit() {
    this.checkButtonType();
  }
  ngOnChanges(sp: SimpleChanges) {
    this.typeButton = {default: false, icon: false, alpha: false, outline: false, troubleshooting: false, loading: false};
    this.checkButtonType();
  }
  checkButtonType() {
    if (this.icon || (!!this.data && this.data.customClasses === 'icon')) {
      this.typeButton.icon = true;
      return;
    }
    if (this.letter || (!!this.data && this.data.customClasses === 'letter')) {
      this.typeButton.alpha = true;
      return;
    }
    if (this.outline || (!!this.data && this.data.customClasses === 'outline')) {
      this.typeButton.outline = true;
      return;
    }
    if (this.troubleshooting || (!!this.data && this.data.customClasses === 'troubleshooting')) {
      this.typeButton.troubleshooting = true;
      return;
    }
    if (this.loading) {
      this.typeButton.loading = true;
      return;
    }
    this.typeButton.default = true;
  }
  onClick_(data: any) {
    this.clickEvent.emit(this.data || data);
  }
}
