
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DIRECTIONS } from '../../general.constants';

@Component({
    selector: 'tecvirt-navigation-slides-buttons',
    template: `
    <div class="tecvirt-navigation-slides-buttons">
        <div class="tecvirt-navigation-slides-buttons__container ">
            <button (click)="goLeft()" id="previous-page" [hidden]="hiddenLeft">
                <ion-icon class="list-arrow" name="ios-arrow-back"></ion-icon>
            </button>
        </div>
        <hr [class.hr-divider]="noDivider">
        <div class="tecvirt-navigation-slides-buttons__container">
            <button (click)="goRight()" id="next-page" [hidden]="hiddenRight">
                <ion-icon class="list-arrow" name="ios-arrow-forward"></ion-icon>
            </button> 
        </div>
    </div>
  `,
    styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationSlidesButtonsComponent {
    @Input() public hiddenLeft = false;
    @Input() public hiddenRight = false;
    @Input() public currentGAPageName = '';
    @Input() public noDivider = false;
    @Output() public buttonClicked = new EventEmitter();
    constructor(
    ) { }
    public navigate(direction) {
        this.buttonClicked.emit(direction);
    }
    public goLeft() {
        // this.loggingProvider.logEventGA(this.currentGAPageName, "voltar_tela", this.loggingProvider.GA.CLICK);
        this.navigate(DIRECTIONS.BACK);
    }
    public goRight() {
        // this.loggingProvider.logEventGA(this.currentGAPageName, "avancar_tela", this.loggingProvider.GA.CLICK);
        this.navigate(DIRECTIONS.FOWARD);
    }
}
