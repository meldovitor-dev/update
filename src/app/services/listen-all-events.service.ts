import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenAllEventsService {

  constructor() {}

  fromEvt(){
    return fromEvent(document, 'click');
  }
}
