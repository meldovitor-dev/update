/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';
import { Store } from '@ngxs/store';
import { ProductService } from '../services/product.service';
import { TimeoutControlService } from '../services/timeout-control.service';
import { LoginService } from '../services/login.service';
import { ScreenSet } from '../actions/screen.actions';

describe('CatalogService', () => {
    let storeSpy;
    let productSpy;
    let timeoutSpy;
    let loginSpy;
    beforeEach(() => {
        storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select', 'selectSnapshot']);
        productSpy = jasmine.createSpyObj('ProductService', ['commitInteraction']);
        timeoutSpy = jasmine.createSpyObj('TimeoutControlService', ['getCountdown']);
        loginSpy = jasmine.createSpyObj('LoginService', {
            isLoggedIn() {
                return true;
            }
        });

        TestBed.configureTestingModule({
            providers: [
                { provide: Store, useValue: storeSpy },
                { provide: ProductService, useValue: productSpy },
                { provide: TimeoutControlService, useValue: timeoutSpy },
                { provide: LoginService, useValue: loginSpy },
            ]
        });
    });

    it('should be created', () => {
        const service: CatalogService = TestBed.get(CatalogService);
        expect(service).toBeTruthy();
    });

    it('should publicAnalytics dispath on store', () => {
        const service: CatalogService = TestBed.get(CatalogService);
        const testObj = {
            gaPageName: 'unit_ga',
            fluxo: 'unit_fluxo'
        };
        service.currentPage = testObj as any;
        service.publicAnalytics();
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new ScreenSet({
            screenName: testObj.gaPageName,
            contextFlow: testObj.fluxo
        }));
    });
    it('should publishGaAlert dispath on store', () => {
        const service: CatalogService = TestBed.get(CatalogService);
        const testObj = {
            gaPageName: 'unit_ga',
        };
        service.currentPage = testObj as any;
        service.publishGaAlert('unit_ga');
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new ScreenSet({
            screenName: testObj.gaPageName,
        }));
    });
    it('should getGaPageName return gaPageName', () => {
        const service: CatalogService = TestBed.get(CatalogService);
        const testObj = {
            gaPageName: 'unit_ga',
        };
        service.currentPage = testObj as any;
        const gaPageName = service.getGaPageName();
        expect(gaPageName).toBe('unit_ga');
    });
    it('should updateCurrentPage push on history array', () => {
        const service: CatalogService = TestBed.get(CatalogService);
        service.currentPage = {
            id: 'myId',
            layout: {teste: 'teste'}
        } as any;
        service.history = [];
        spyOn(service, 'findPageOnCatalog').and.returnValue({id: 'myId2'} as any);
        service.updateCurrentPage('myId2');
        expect(service.findPageOnCatalog).toHaveBeenCalledWith('myId2');
        expect(service.currentPage).toEqual({id: 'myId2'} as any);
        expect(service.history.length).toBe(1);
    });


});
