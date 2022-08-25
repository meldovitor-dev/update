import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ModalController } from '@ionic/angular';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityPageModel } from 'src/app/models/utility-render-model';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-utility-render',
  templateUrl: './utility-render.component.html',
  styleUrls: ['./utility-render.component.scss'],
})
export class UtilityRenderComponent implements OnInit {
  @Input() pageCatalog: UtilityPageModel[];
  @Input() initialPage: string;
  @Output() clickEvent = new EventEmitter<any>();
  currentPage: UtilityPageModel;
  historyCatalog: UtilityPageModel[] = [];
  constructor(public modalController: ModalController,
              public analyticsService: AnalyticsService,
              public store: Store) { }

  ngOnInit() {
    this.currentPage = this.pageCatalog.find(el => el.id === this.initialPage);
    this.publicAnalytics()
  }
  buttonClick(btn) {
    const { action } = btn;
    this[action.call](action.params);
  }
  nav(pageId) {
    const { id } = pageId;
    this.updateCurrentPage(id);
  }
  updateCurrentPage(pageId) {
    const old = this.currentPage;
    this.historyCatalog.push(old);
    this.currentPage = this.findPageOnCatalog(pageId);
    this.publicAnalytics();
  }
  findPageOnCatalog(id) {
    return this.pageCatalog.find(el => el.id === id);
  }
  goToPreviousPage() {
    if (!this.historyCatalog.length) {
      this.modalController.dismiss();
      return;
    }
    this.currentPage = this.historyCatalog.pop();
  }
  closeRender(params?) {
    this.modalController.dismiss(params);
  }
  hiddenBackButton() {
    return !this.historyCatalog.length;
  }
  publicAnalytics() {
    if (!this.currentPage.gaPageName) {
      return;
    }
    const analytics: ScreenStateModel = {
      screenName: this.currentPage.gaPageName
    };
    this.store.dispatch(new ScreenSet(analytics));
  }
}
