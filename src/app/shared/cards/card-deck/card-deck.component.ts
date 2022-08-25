import { ProductInterface } from 'src/app/domain/product.interface';
import { CARD_COLECTION } from '../card-single/card-catalog';
import { ProductState } from '../../../states/product.state';
import { Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/domain/feature';
import { Observable } from 'rxjs';
import { UtilityState } from 'src/app/states/utility.state';

@Component({
  selector: 'tecvirt-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss'],
})
export class CardDeckComponent implements OnInit {
  @Select(ProductState.getCurrentProduct) product$: Observable<ProductInterface>;
  @Select(UtilityState.getHomeTickets()) ticketHome$: Observable<any>;
  public toggleDisable = false;
  constructor() { }

  ngOnInit() {
  }
  getCard(feature: Feature) {
    return CARD_COLECTION(feature.featureCode);
  }
  getFeatureThatIsACard(features: Feature[]) {
    const cards = ['cards-multi-feature', 'cards-single-feature', 'cards-agendamento'];
    if (features.length) {
      return features.filter(el => (cards.includes(el.displayOnHome))) || [];
    }
  }
  getFeatureThatIsACardSingle(features: Feature[]) {
    if (features.length) {
      return features.filter(el => (el.displayOnHome === 'cards-single-feature')) || [];
    }
  }
  getFeatureThatIsACardMulti(features: Feature[]) {
    if (features.length) {
      return features.filter(el => (el.displayOnHome === 'cards-multi-feature')) || [];
    }
  }
  getFeatureThatIsACardAgendamento(features: Feature[]) {
    if (features.length) {
      return features.filter(el => (el.displayOnHome === 'cards-agendamento')) || [];
    }
  }
}
