import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { SchedulingHomeComponent } from './scheduling-home/scheduling-home.component';
import { SchedulingService } from './scheduling.service';
import { HeaderDateComponent } from './scheduling-home/header-date/header-date.component';
import { SchedulingTimelineComponent } from './scheduling-home/scheduling-timeline/scheduling-timeline.component';
import { SchedulingButtonsComponent } from './scheduling-home/scheduling-buttons/scheduling-buttons.component';
import { SchedulingDetailsComponent } from './scheduling-details/scheduling-details.component';
import { SchedulingSlotsComponent } from './scheduling-details/scheduling-slots/scheduling-slots.component';
import { SchedulingConfirmComponent } from './scheduling-details/scheduling-confirm/scheduling-confirm.component';
import { SchedulingDisplayComponent } from './scheduling-details/scheduling-confirm/scheduling-display/scheduling-display.component';

const ROUTES: Routes = [
    {
        path: '', component: SchedulingComponent,
        children: [
            {
                path: '',
                component: SchedulingHomeComponent
            },
            {
                path: 'reagendar/:id',
                component: SchedulingDetailsComponent
            },
            {
                path: 'agendar/:id',
                component: SchedulingDetailsComponent
            },
            {
                path: 'cancelar/:id',
                component: SchedulingDetailsComponent
            },
        ]
    }
];

@NgModule({
    declarations: [
        SchedulingComponent,
        SchedulingHomeComponent,
        HeaderDateComponent,
        SchedulingTimelineComponent,
        SchedulingButtonsComponent,
        SchedulingDetailsComponent,
        SchedulingSlotsComponent,
        SchedulingConfirmComponent,
        SchedulingDisplayComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CoreModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    providers: [SchedulingService]
})
export class SchedulingModule { }
