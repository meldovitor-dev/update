import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-login-special-area',
  templateUrl: './login-special-area.component.html',
  styleUrls: ['./login-special-area.component.scss'],
})
export class LoginSpecialAreaComponent implements OnInit {
  expanded = false;
  slidesOptions = {
    loop: true,
    pager: true,
    speed: 400
  };
  @Input() page?;
  @ViewChild('WildSlides', { static: false }) slides;
  constructor(public logg: AnalyticsService) { }

  ngOnInit() { }
  toggleContent() {
    this.logg.logEventGA('orientacoes_login', 'click');
    this.expanded = !this.expanded;
    this.slides.update();
    this.slides.startAutoplay();
  }
}
