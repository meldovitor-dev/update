import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(public toast: ToastController) { }

  clip(text: string) {
    const id = 'mycustom-clipboard-textarea-hidden-id';
    let existsTextarea = document.getElementById(id);

    if (!existsTextarea) {
      // console.log('Creating textarea');
      const textarea = document.createElement('textarea');
      textarea.id = id;
      // Place in top-left corner of screen regardless of scroll position.
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textarea.style.width = '1px';
      textarea.style.height = '1px';

      // We don't need padding, reducing the size if it does flash render.
      textarea.style.padding = '0';

      // Clean up any borders.
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';

      // Avoid flash of white box if rendered for any reason.
      textarea.style.background = 'transparent';
      document.querySelector('body').appendChild(textarea);
      existsTextarea = document.getElementById(id);
    } else {
      console.warn('clipboard.service - The textarea already exists :3');
    }

    (existsTextarea as any).value = text;
    (existsTextarea as any).select();

    try {
      const status = document.execCommand('copy');
      if (!status) {
        console.warn('clipboard.service - Cannot copy text');
      }
    } catch (err) {
      console.warn('clipboard.service - Unable to copy.');
    }
    document.getElementById(id).remove();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Copiado!',
      duration: 2000
    });
    toast.present();
  }
}
