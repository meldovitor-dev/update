import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare let window;

@Injectable({
  providedIn: 'root'
})
export class ScreenOrientationService {

  constructor(
    private platform: Platform) { }

  init() {
    if (!this.platform.is('hybrid')) {
      this.webPlatforms();
      return;
    }
    if (this.isProviderDefined()) {
      try {
        // lock the device orientation
        (window as any).screen.orientation.lock('portrait');
      } catch (e) {
        // error on lock screen
      }
    }
  }
  isProviderDefined() {
    return ((window as any) && (window as any).screen && (window as any).screen.orientation);
  }
  webPlatforms() {
    const { screen } = window;
    screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
    if (!screen.lockOrientationUniversal) {
      return;
    }
    screen.lockOrientationUniversal('portrait');
  }
}
