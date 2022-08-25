import { DiagnosticBlocksComponent } from './diagnostic-blocks/diagnostic-blocks.component';
import { CoreModule } from './../core/core.module';
import { DiagnosticCoreComponent } from './diagnostic-core/diagnostic-core.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticPageRoutingModule } from './diagnostic-routing.module';

import { DiagnosticPage } from './diagnostic.page';
import { SharedModule } from '../shared/shared.module';
import { StepTimerComponent } from './diagnostic-core/step-timer/step-timer.component';
import { AutomaticStepsComponent } from './diagnostic-core/automatic-steps/automatic-steps.component';
import { StatusCheckComponent } from './diagnostic-core/status-check/status-check.component';
import { ConclusionStepsComponent } from './diagnostic-core/conclusion-steps/conclusion-steps.component';
import { IntermediateChronoComponent } from './diagnostic-core/intermediate-chrono/intermediate-chrono.component';
import { DiagnosticCancelComponent } from './diagnostic-cancel/diagnostic-cancel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    SharedModule,
    DiagnosticPageRoutingModule
  ],
  declarations: [
      DiagnosticPage,
      DiagnosticCoreComponent,
      DiagnosticBlocksComponent,
      StepTimerComponent,
      AutomaticStepsComponent,
      StatusCheckComponent,
      ConclusionStepsComponent,
      IntermediateChronoComponent,
      DiagnosticCancelComponent,
    ],
  exports: [AutomaticStepsComponent, ConclusionStepsComponent],
  providers: [],
  entryComponents: [DiagnosticCancelComponent]
})
export class DiagnosticPageModule {}
