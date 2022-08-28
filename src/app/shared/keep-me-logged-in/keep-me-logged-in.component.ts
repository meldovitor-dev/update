import { Component, OnInit, Input } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'tecvirt-keep-me-logged-in',
  templateUrl: './keep-me-logged-in.component.html',
  styleUrls: ['./keep-me-logged-in.component.scss'],
})
export class KeepMeLoggedInComponent implements OnInit {

  @Input() theme = 'dark';
  keepMe;
  constructor(public localStorageService: LocalstorageService) { }

  ngOnInit() {
    const item = this.localStorageService.getItem('keep_me_loggedin');
    this.keepMe = !!item;
  }
  updatedEvt(evt) {
    if (!this.keepMe) {
      this.localStorageService.removeItem('keep_me_loggedin');
      return;
    }
    this.localStorageService.setItem('keep_me_loggedin', !!this.keepMe);
  }

}
