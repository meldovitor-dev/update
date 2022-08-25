import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class SocialShareService {

  constructor() { }
  public shareIt() {
    Share.share({
      title: 'Técnico Virtual',
      text: 'Olha como é fácil ter suporte técnico pra Fibra, Internet, TV e Fixo da Oi. Baixe o app Técnico Virtual e teste agora mesmo.',
      url: 'http://oi.digital/AppTecnicoVirtualFibra',
      dialogTitle: 'Compartilhe com os amigos'
    });
  }
}
