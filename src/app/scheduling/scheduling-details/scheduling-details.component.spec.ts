import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDetailsComponent } from './scheduling-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulingService } from '../scheduling.service';
import { CallService } from 'src/app/services/call.service';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

let route;
let router;
let schedulingService;
let callService;
let store;
xdescribe('SchedulingDetailsComponent', () => {
    let component: SchedulingDetailsComponent;
    let fixture: ComponentFixture<SchedulingDetailsComponent>;
    route = jasmine.createSpyObj('ActivatedRoute', [{
        paramMap: { pipe: () => of({}) }
    }]);
    router = jasmine.createSpyObj('Router', ['navigate']);
    schedulingService = jasmine.createSpyObj('SchedulingService', ['inti']);
    callService = jasmine.createSpyObj('CallService', ['call']);
    store = jasmine.createSpyObj('Store', ['select']);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchedulingDetailsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { useValue: route, provide: ActivatedRoute },
                { useValue: router, provide: Router },
                { useValue: schedulingService, provide: SchedulingService },
                { useValue: callService, provide: CallService },
                { useValue: store, provide: Store }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchedulingDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
