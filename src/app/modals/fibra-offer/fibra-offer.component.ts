import { ProductState } from './../../states/product.state';
import { LocalstorageService } from './../../services/localstorage.service';
import { LocationState } from './../../states/location.state';
import { TECNICO_VIRTUAL_API } from './../../../environments/server-urls';
import { RequestProviderService } from './../../services/request-provider.service';
import { CallService } from './../../services/call.service';
import { Store } from '@ngxs/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InteractionEnum } from 'src/app/domain/interactions';
import { SubSink } from 'subsink';
import { take, finalize } from 'rxjs/operators';
import { ProductHelper } from 'src/app/helpers/product-helper';

export enum FibraOfferEnum {
  INIT = 'intro',
  NOT_AVAILABLE = 'not-available',
  TIMEOUT = 'timeout',
  SUCCESS_RESULT = 'fibra-offer'
}

const bodyContent = [
  {
    id: FibraOfferEnum.INIT,
    gaPageName: 'fixo_consulta_disponibilidade_fibra_endereco',
    src: 'tv_fibra.png',
    hasForm: true,
    title: 'Tenha Oi Fibra na sua casa',
    description: 'Digite os dados abaixo e verifique se Oi Fibra está disponível na sua região:',
    button: {
      txt: 'Verifique a disponibilidade',
      action: {
        call: 'verifyAvailability',
        params: {}
      }
    }
  },
  {
    id: FibraOfferEnum.SUCCESS_RESULT,
    title: 'Você já pode ter Oi Fibra',
    src: 'tv_fibra2.png',
    description: 'Parabéns! Você já pode ter o melhor da Internet, Fixo e TV na sua casa. ' +
      'Clique abaixo para falar com um dos nossos consultores.',
    button: {
      txt: 'Ligar',
      action: {
        call: 'goToCallService',
        params: {}
      }
    }
  },
  {
    id: FibraOfferEnum.NOT_AVAILABLE,
    title: 'Oi Fibra ainda não chegou na sua região',
    description: 'Estamos trabalhando para aumentar a cobertura e informaremos assim que estiver disponível.',
    error: true,
    button: {
      txt: 'Fechar',
      action: {
        call: 'closeModal',
        params: {}
      }
    }
  },
  {
    id: FibraOfferEnum.TIMEOUT,
    title: 'Não conseguimos verificar a disponibilidade',
    description: 'Tente novamente mais tarde para verificar a disponibilidade da Oi Fibra na sua região.',
    error: true,
    button: {
      txt: 'Fechar',
      action: {
        call: 'closeModal',
        params: {}
      }
    }
  },
];

@Component({
  selector: 'tecvirt-fibra-offer',
  templateUrl: './fibra-offer.component.html',
  styleUrls: ['./fibra-offer.component.scss'],
})
export class FibraOfferComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  modalPage;
  loading = false;
  cep: string;
  addressNumber: string;
  noNumber = false;
  cepFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(9),
  ]);
  addressNumberFormControl = new FormControl('');
  constructor(private modalController: ModalController,
    private lstorage: LocalstorageService,
    private callService: CallService,
    private requestProviderService: RequestProviderService,
    private store: Store) { }

  ngOnInit() {
    this.modalPage = this.getOfferPage(FibraOfferEnum.INIT);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  verifyAvailability() {
    const interaction = InteractionEnum.consultarViabilidadeFibra;
    let data = `?cep=${this.cep}&numero=${this.addressNumber}`
    if (this.noNumber) {
      data = data.split('&')[0];
    }
    const url = `${TECNICO_VIRTUAL_API.api}/usuarios/consultarViabilidadeFibra${data}`;
    this.loading = true;
    const request = this.requestProviderService.get(url, undefined).pipe(
      finalize(() => this.loading = false),
      take(1)
    );
    this.subs.add(request.subscribe((res: any) => {
      const { viavelFibra } = res;
      if (viavelFibra) {
        this.modalPage = this.getOfferPage(FibraOfferEnum.SUCCESS_RESULT);
        return;
      }
      this.modalPage = this.getOfferPage(FibraOfferEnum.NOT_AVAILABLE);
    }, (err) => {
      this.modalPage = this.getOfferPage(FibraOfferEnum.TIMEOUT);
    }));
  }
  closeModal() {
    this.modalController.dismiss();
    this.subs.unsubscribe();
    if (this.store.selectSnapshot(LocationState.getLocation) === 'success') {
      this.lstorage.setItem('fo', true);
    }
  }
  getAtendimento() {
    const config = this.store.selectSnapshot(ProductState.getConfig);
    let atendimento: any;
    if (!config) {
      atendimento = ProductHelper.getPhoneConfig();
      return atendimento.fibraOffer;
    }
    atendimento = ProductHelper.extractConfigValue(config, 'viabilidadeFibra');
    return atendimento.telefone;
  }
  goToCallService() {
    const callNumber = this.getAtendimento();
    this.callService.callWithNumber(callNumber);
  }
  getOfferPage(id) {
    return bodyContent.find(el => el.id === id);
  }
  setCEP(value) {
    this.cep = value.match(/\d/g).join('');
  }
  setNumero(value) {
    this.addressNumber = value;
  }
  noNumberEvt() {
    if (this.noNumber) {
      this.addressNumberFormControl.disable();
      this.addressNumberFormControl.setValue('');
      this.addressNumberFormControl.setErrors(null);
      return;
    }
    this.addressNumberFormControl.enable();
  }
  actionButton() {
    const { action } = this.modalPage.button;
    this[action.call](action.params);
  }
}
