import { Injectable } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root'
})
export class SplashscreenService {

  constructor() { }

  hide() {
    SplashScreen.hide();
  }
}
