/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { ProductCodeEnum } from '../enums/product.enum';
import { NotificationModel } from './notification.model';

/**
 * Represents a Data Transfer Object.
 * Additional Data Payload sent by OneSignal for data notifications (which feed the internal notification center).
 */
export class NotificationDTO {
  // Sent by OneSignal message dashboard
  id: string;
  title: string;
  paragraph: string;
  products?: string;
  icon?: string;
  link?: string;
  button_text?: string;
  button_ga_action?: string;
  // Setted by Notification Interceptor classses
  createdAt: number;
  unread: number;

  constructor({ id, title, paragraph, createdAt, products, icon, unread, link, button_text, button_ga_action }) {
    this.id = id;
    this.title = title;
    this.paragraph = paragraph;
    this.products = products === '' ? undefined : products;
    this.icon = icon === '' ? undefined : icon;
    this.createdAt = createdAt;
    this.unread = unread;
    this.link = link === '' ? undefined : link;
    this.button_text = button_text === '' ? undefined : button_text;
    this.button_ga_action = button_ga_action === '' ? undefined : button_ga_action;
  }

  public toNotificationModel(): NotificationModel {
    const allProducts = Object.keys(ProductCodeEnum).filter(k => typeof ProductCodeEnum[k as any] === 'number').map(k => ProductCodeEnum[k as any]);

    const notification: NotificationModel = {
      id: this.id,
      title: this.title,
      paragraph: this.paragraph,
      creationDate: this.createdAt,
      products: this.products ? this.products.split(',').map(p => ProductCodeEnum[p.trim().toUpperCase()]) : allProducts,
      icon: './../../assets/icon/central-notificacao/anuncio.svg',
      unread: Boolean(this.unread),
    };

    if (this.button_text && this.button_ga_action && this.link) {
      notification['button'] = { text: this.button_text, gaAction: this.button_ga_action };
      notification['link'] = this.link;
    }

    return notification;
  }

}
