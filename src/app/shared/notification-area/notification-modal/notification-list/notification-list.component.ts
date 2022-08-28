import { ModalController } from '@ionic/angular';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'tecvirt-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {

  @Output() clickEvent = new EventEmitter<any>();

  constructor(public notificationService: NotificationService,
    public modalController: ModalController) { }

  ngOnInit() { }

  notificationClick(item) {
    this.clickEvent.emit(item);
  }
  closeModal() {
    this.modalController.dismiss();
  }
  getDate(timestamp) {
    const date = new Date(timestamp)
    const month = date.toLocaleString('default', { month: 'long' });
    return `${date.getDate()} de ${month}, às ${date.toTimeString().split(':', 2).join(':')}`;
  }

}
