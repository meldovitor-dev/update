import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestProviderService {

  constructor(public http: HttpClient) { }

  get(url: string, options: any) {
    return this.http.get(url, options);
  }
  post(url: string, data = {}, options: any) {
    return this.http.post(url, data, options);
  }
  put(url: string, data: any, options) {
    return this.http.put(url, data || {}, options);
  }
  delete(url: string, options) {
    return this.http.delete(url, options);
  }
  patch(url: string, data, options) {
    return this.http.patch(url, data, options);
  }
}
