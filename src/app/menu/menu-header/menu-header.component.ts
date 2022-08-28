import { AnalyticsService } from 'src/app/core/analytics.service';
import { AppStateModel } from './../../states/app.state';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  @Input() app: AppStateModel;
  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() { }
  publishGa() {
    this.analyticsService.logEventGA('fechar', 'click');
  }

}
