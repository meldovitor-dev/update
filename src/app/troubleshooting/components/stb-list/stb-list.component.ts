import { UtilityRenderComponent } from './../../../shared/utility-render/utility-render.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { FIBRA_FIND_STB } from '../../catalogs/problem-solver/fibra/tv/fibra-find-stb.catalog';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';

@Component({
  selector: 'tecvirt-stb-list',
  templateUrl: './stb-list.component.html',
  styleUrls: ['./stb-list.component.scss']
})
export class StbListComponent implements OnInit {
  @Input() stbContent;
  @Output() buttonClickedEvt = new EventEmitter<any>();
  findSTBCatalog = FIBRA_FIND_STB;
  stbCatalogInitialPage = CatalogPrefix.FIND_STB + 0;
  constructor(public analyticsService: AnalyticsService, public modalCtrl: ModalController) { }
  ngOnInit() {
  }

  findSTB() {
    this.analyticsService.logEventGA('orientacao_encontrar_numero_serie', 'click');
    this.openFindSTB();
    // this.buttonClickedEvt.emit('findSTB');
  }

  public async openFindSTB() {
    const modal = await this.modalCtrl.create({
      component: UtilityRenderComponent,
      componentProps: {
        pageCatalog: this.findSTBCatalog,
        initialPage: this.stbCatalogInitialPage
      }
    });
    await modal.present();
    const { data }: any = await modal.onWillDismiss();
    if (!data) {
      return;
    }
    console.log(data.success);
  }

}
