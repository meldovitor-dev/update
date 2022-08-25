/* eslint-disable no-trailing-spaces */
import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-breadcrumb',
  template: `
        <style>
            .bc-wrapper {
                line-height: 1.5em;
            }
            .bc-wrapper span {
                margin-top: 1em;
            }
            .bc-wrapper span > b { 
                color: white; 
                background: #6D6D6D; 
                padding: 0 0.3em; 
                border-radius: 0.2em; 
                text-transform: uppercase;
            } 
            .bc-foward {
                color: #00C0D2;
                font-size: 1em;
            }
        </style>
        <div class='bc-wrapper'>
            <span *ngFor='let el of elements; let idx = index'>
                <b>{{el}}</b>
                <ion-icon [hidden]='idx === (elements.length - 1)' class='bc-foward' name='ios-arrow-forward'></ion-icon>
            </span>
        <div>
  `,
})
export class BreadcrumbComponent {
  @Input() public elements = [];
  constructor(
  ) { };
}
