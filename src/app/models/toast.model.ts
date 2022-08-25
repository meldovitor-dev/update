/* eslint-disable @typescript-eslint/naming-convention */
export interface ToastModel {
  type: ToastTypes;
  message: string;
  position?: 'top' | 'bottom' | 'middle';
  duration?: number;
  gaAction: string;
}

export enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  ALERT = 'alert',
  INFO = 'info',
  HELP = 'help',
  BLOCK = 'block',
  DARK = 'dark'
}
