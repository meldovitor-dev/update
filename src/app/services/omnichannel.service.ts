import { FeatureState } from './../states/feature.state';
import { TicketState } from './../states/ticket.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductService } from './product.service';
import { ProductState } from '../states/product.state';
import { UserState } from '../states/user.state';
import { ConfirmaMigracaoCobreDTO } from '../domain/omnichannel-dto/confirma-migracao.dto';
import { InteractionEnum } from '../domain/interactions';
import { InformaErroNetQDTO } from '../domain/omnichannel-dto/informa-erro-netq.dto';

@Injectable({
  providedIn: 'root'
})
export class OmnichannelService {

  constructor(public store: Store, public productService: ProductService) { }

  sendConfirmarMigracao(dateSelected) {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const user = this.store.selectSnapshot(UserState.getUser);
    const payload = new ConfirmaMigracaoCobreDTO(user, product, dateSelected);
    this.productService.commitInteraction(InteractionEnum.omnichannelInfo, payload);
  }

  sendNetQNok() {
    const ticket = this.store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    if (ticket && ticket.payload && ticket.payload.original && ticket.payload.original.diagnostic) {
      const { diagnostic } = ticket.payload.original;
      const error = diagnostic.messages || [];
      const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
      const user = this.store.selectSnapshot(UserState.getUser);
      const feature = this.store.selectSnapshot(FeatureState.getFeature);
      const payload = new InformaErroNetQDTO(user, product, feature, error);
      this.productService.commitInteraction(InteractionEnum.omnichannelInfo, payload);
      console.log(error);
    }
  }
}
