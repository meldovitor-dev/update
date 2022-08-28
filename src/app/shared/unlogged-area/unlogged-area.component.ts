import { OiProductsComponent } from './../../modals/oi-products/oi-products.component';
import { ModalController, Platform } from '@ionic/angular';
import { Feature } from './../../domain/feature';
import { LoginService } from './../../services/login.service';
import { ProductInterface } from './../../domain/product.interface';
import { Observable } from 'rxjs';
import { FeatureSet } from './../../actions/feature.action';
import { getProductByIdentifier } from './../../domain/product-portfolio';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductState } from 'src/app/states/product.state';
import { Select, Store } from '@ngxs/store';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-unlogged-area',
  templateUrl: './unlogged-area.component.html',
  styleUrls: ['./unlogged-area.component.scss'],
})
export class UnloggedAreaComponent implements OnInit {

  @Select(ProductState.getCurrentProduct) product$: Observable<ProductInterface>;

  constructor(
    public router: Router,
    public store: Store,
    public analyticsService: AnalyticsService,
    public loginService: LoginService,
    public modalCtrl: ModalController,
    private platform: Platform
  ) { }
  ngOnInit() { }

  public getIcon(feature: Feature) {
    const icons = {
      [FeatureEnum.FIBRA_CONTROLE_REMOTO]: 'controle-remoto',
      [FeatureEnum.FIBRA_RECURSOS_AVANCADOS]: 'recursos-avancados',
      [FeatureEnum.FIBRA_GUIA_PROGRAMACAO]: 'guia-programacao',
      [FeatureEnum.SMARTV_WIFI]: 'guide-smartv',
      [FeatureEnum.MELHORAR_WIFI]: 'dicas-wifi',
      [FeatureEnum.FAZER_LIGACAO]: 'ligacao',
      [FeatureEnum.FIBRA_CONFIG_ANTENA_MODEM]: 'antena-modem',
      [FeatureEnum.OI_PRODUCTS]: 'produtos-oi',
      [FeatureEnum.TV_CONTROLE_REMOTO]: 'controle-remoto',
      [FeatureEnum.FIBRA_WELCOME_KIT]: 'welcome-kit',
      [FeatureEnum.RETIRADA_EQUIPAMENTO_FIBRA]: 'retirada-equipamento-fibra'
    };
    return icons[feature.featureCode] || '';
  }

  getFeatureThatIsAnIcon(features: Feature[]) {
    if (features.length) {
      return features.filter(el => (el.displayOnHome === 'icon')) || [];
    }
  }

  async onSelectFeature(feature: Feature) {
    this.publishGaEvent(feature);
    await this.store.dispatch(new FeatureSet(feature)).toPromise();
    const id = this.store.selectSnapshot(ProductState.getCurrentProduct).identifier;
    const product = getProductByIdentifier(id);
    const f = product.features.find(el => el.featureCode === feature.featureCode);
    if (this.isModalFeature(f)) {
      this.openFeatureModal(f);
      return;
    }
    this.router.navigate([f.renderRouter]);
  }
  isModalFeature(feature: Feature): boolean {
    return !!feature.modalInfo;
  }
  public async openFeatureModal(feature: Feature) {
    const modal = await this.modalCtrl.create({
      component: OiProductsComponent,
    });
    await modal.present();
  }
  publishGaEvent(feature) {
    const { ga } = feature;
    if (ga) {
      this.analyticsService.logEventGA(ga, 'click');
    }
  }
  isAcceptedPlatform(feature: Feature): boolean {
    const { platforms } = feature;
    if (platforms) {
      return platforms.some(el => this.platform.is(el));
    }
    return true;
  }
  shouldBeHidden(feature: Feature) {
    return !this.isAcceptedPlatform(feature);
  }

}
