import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-viewmore-button',
  template: `
    <div view-more>
      <ion-fab>
        <ion-fab-button size="small" color="dark-green">
          <ion-icon name="ios-arrow-down"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-label [hidden]='noLabel' color='white'>VER MAIS</ion-label>
    </div>
  `,
  styleUrls: ['./viewmore-button.component.scss'],
})
export class ViewmoreButtonComponent implements OnInit {
  @Input() noLabel;
  constructor() { }

  ngOnInit() {}

}
