import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { UtilityPageModel } from './utility-render-model';

export interface NotificationModel {
  id: string;
  title: string;
  paragraph: string;
  icon?: string;
  creationDate: number;
  expirationDate?: number;
  catalog?: UtilityPageModel[];
  unread: boolean;
  button?: NotificationButtonsModel;
  link?: string;
  products?: ProductCodeEnum[];
}

export interface NotificationButtonsModel {
  text: string;
  gaAction: string;
}
