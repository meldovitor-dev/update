import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  constructor() { }

  async get(key: string): Promise<string> {
    try {
      const result = await SecureStoragePlugin.get({ key });
      return (result && result.value) ? result.value : '';
    } catch (e) {
      // TODO LOG GA
      return '';
    }
  }

  async set(key: string, value: string) {
    try {
      await SecureStoragePlugin.set({ key, value });
    } catch (e) {
      // TODO LOG GA
    }
  }
  async remove(key: string) {
    try {
      await SecureStoragePlugin.remove({ key });
    } catch (e) {
      // TODO LOG GA
    }
  }
}
