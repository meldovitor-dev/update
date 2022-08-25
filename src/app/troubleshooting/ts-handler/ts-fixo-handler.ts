import { TsHandler } from './ts-handler';
import { Store } from '@ngxs/store';
import { TicketState } from 'src/app/states/ticket.state';
import { InteractionEnum } from 'src/app/domain/interactions';
import { ProductState } from 'src/app/states/product.state';
import { UserState } from 'src/app/states/user.state';
import { ProductHelper } from 'src/app/helpers/product-helper';
import { FeatureState } from 'src/app/states/feature.state';
import { BilheteDefeitoDTO } from 'src/app/domain/omnichannel-dto/bilhete-defeito.dto';

export class TsFixoHandler extends TsHandler {
  efetuarAberturaBD(store: Store, data) {
    const { productCode } = store.selectSnapshot(
      ProductState.getCurrentProduct
    );
    const filterData = {
      produto: productCode,
      contatoReclamante1: data.phone
    };
    return filterData;
  }

  getBdId(store: Store, data?) {
    const ticket = store.selectSnapshot(
      TicketState.getTickets(InteractionEnum.efetuarAberturaBD)
    );
    if (ticket && ticket.payload && ticket.payload.bd) {
      return ticket.payload.bd;
    }
    return undefined;
  }

  getBdInfo(store: Store, data?){
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.efetuarAberturaBD));
    const resCorp = {
      bd: '',
      bdJaAberto: false
    };
    if (ticket && ticket.payload) {
      resCorp.bd = ticket.payload.bd === 'null'? '' : ticket.payload.bd;
      resCorp.bdJaAberto = ticket.payload.bdAberto;
    }
    return resCorp;
  }

  consultarAberturaBD(store: Store, data?) {
    const feature = store.selectSnapshot(FeatureState.getFeature);
    const product = store.selectSnapshot(ProductState.getCurrentProduct);
    const user = store.selectSnapshot(UserState.getUser);
    const productCode = ProductHelper.omnichannelProductTranslator(product.productCode);
    const { ticket } = data;
    const payload = new BilheteDefeitoDTO(user, product, feature, productCode, ticket);
    return payload;
  }
}
