/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { TestBed } from '@angular/core/testing';
import { DiagnosticService } from './diagnostic.service';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../states/user.state';
import { ProductState } from '../states/product.state';
import { ScreenState } from '../states/screen.state';
import { HttpClientModule } from '@angular/common/http';

describe('DiagnosticService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
            imports: [NgxsModule.forRoot([UserState, ProductState, ScreenState]), HttpClientModule]
        });
    });

    it('should be created', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        expect(service).toBeTruthy();
    });

    it('should be register cb', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        service.cbs = [];
        service.registerDistroyers(() => { });
        expect(service.cbs.length).toEqual(1);
    });

    it('should return priority block', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        service.blockPage = {
            priority: 1
        };
        const block = {
            priority: 2
        };
        expect(service.checkPriority(block)).toEqual(block);
    });

    it('should return previous priority block', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        service.blockPage = {
            priority: 2
        };
        const block = {
            priority: 1
        };
        const result = service.checkPriority(block);
        expect(result).toEqual(service.blockPage);
    });


    it('should return new block', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        service.blockPage = undefined;
        const block = {
            priority: 1
        };
        expect(service.checkPriority(block)).toEqual(block);
    });

    it('should return same priority, return previous', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        service.blockPage = {
            title: 'old'
        };
        const block = {
            title: 'new'
        };
        expect(service.checkPriority(block)).toEqual(block);
    });

    it('should exec destroyers emit events', () => {
        const service: DiagnosticService = TestBed.get(DiagnosticService);
        const cb = {
            next() {
            }
        };
        spyOn(cb, 'next').and.callThrough();
        spyOn(service.finishDiagnostic, 'next').and.callFake(() => { });
        service.cbs = [
            cb
        ];
        service.execDistroyers();
        expect(cb.next).toHaveBeenCalled();
        expect(service.finishDiagnostic.next).toHaveBeenCalled();
        expect(service.cbs.length).toEqual(0);
    });

});
