/* eslint-disable @typescript-eslint/naming-convention */
import { Store } from '@ngxs/store';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { WIZARD_PAGES } from './wizard.constants';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ScreenSet } from 'src/app/actions/screen.actions';
import { SplashscreenService } from 'src/app/services/splashscreen.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterContentInit {
    gaPageName = 'apresentando_app';
    DIRECTION = {
        LEFT: 2,
        RIGHT: 4
    };
    page;
    pages = [];
    constructor(public router: Router,
                public localstorageService: LocalstorageService,
                public store: Store,
                public sc: SplashscreenService,
                public ps: PermissionsService) {
        this.pages = WIZARD_PAGES;
        this.page = WIZARD_PAGES[0];
    }

    ngOnInit() {
    }
    ngAfterContentInit(): void {
        this.store.dispatch(new ScreenSet({
            screenName: this.gaPageName,
            contextFlow: 'wizard'
        }));
        this.sc.hide(); // hide splash
        this.ps.init(); // ask user permissions
    }

    bulletEvt(idx = 0) {
        this.updatePage(idx);
    }
    onClick(btn) {
        this[btn.action]();
    }
    next() {
        const idx = this.pages.indexOf(this.page);
        if (idx < this.pages.length) {
            this.updatePage(idx + 1);
        }
    }
    getIcon(icon) {
        return './assets/images/product-portfolio/' + icon + '.svg';
    }
    getAnimation() {
        const key = this.pages.indexOf(this.page);
        switch (key) {
            case 1:
                return 'mid';
            case 2:
                return 'end';
            default:
                return 'start';
        }
    }
    goToProductSelection() {
        this.localstorageService.setItem('firstAccess', true);
        this.router.navigate([''], {replaceUrl: true});
    }
    updatePage(idx= 0) {
        this.page = this.pages[idx ];
    }
    onSwipe(evt) {
        if (!evt) {
            return;
        }
        const { direction } = evt;
        if (!direction || isNaN(direction)) {
            return;
        }
        if ( direction === this.DIRECTION.LEFT ) {
            this.moveRight();
            return;
        }
        this.moveLeft();
    }
    getCurrentIdx() {
        return  this.pages.indexOf(this.page);
    }
    moveLeft() {
        const idx = this.getCurrentIdx();
        if (idx > 0) {
            this.updatePage(idx - 1);
        }
    }
    moveRight() {
        const idx = this.getCurrentIdx();
        if (idx < (this.pages.length - 1)) {
            this.updatePage(idx + 1);
        }
    }
}
