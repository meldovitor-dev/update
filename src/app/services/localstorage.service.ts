import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getLocalStorage() {
    return (typeof window !== 'undefined') ? window.localStorage : undefined;
  }
  setItem(key: string, value: any) {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.setItem(key, value);
    }

  }
  getItem(key: string): any {
    const storage = this.getLocalStorage();
    if (storage) {
      return storage.getItem(key);
    }
    return undefined;
  }
  removeItem(key) {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.removeItem(key);
    }
  }
  clearAllStore() {
    localStorage.clear();
  }
}
