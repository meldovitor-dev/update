import { LoginService } from './../../services/login.service';
import { ModalController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-offline-handler',
  templateUrl: './anti-robot.component.html',
  styleUrls: ['./anti-robot.component.scss'],
})
export class AntiRobotComponent implements OnInit {
  subs = new SubSink();
  constructor( private modalController: ModalController,
               private loginService: LoginService,
               private store: Store,
             ) { }

  ngOnInit() {
    const analytics: ScreenStateModel = {
      screenName: 'aviso_antirobo'
    };
    this.store.dispatch(new ScreenSet(analytics));
  }

  logoutAndReturn() {
    this.modalController.dismiss();
    this.loginService.logoutAndReturn();
  }
}
