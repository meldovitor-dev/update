import { WifiSignalVerifierComponent } from './components/wifi-signal-verifier/wifi-signal-verifier.component';
import { WifiSignalDependenciesComponent } from './components/wifi-signal-dependencies/wifi-signal-dependencies.component';
import { WifiLabelComponent } from './components/wifi-label/wifi-label.component';
import { SsidInputComponent } from './components/ts-input/ssid-input/ssid-input.component';
import { TsInputComponent } from './components/ts-input/ts-input.component';
import { RedesListComponent } from './components/redes-list/redes-list.component';
import { PasswordInputComponent } from './components/ts-input/password-input/password-input.component';
import { NavigationSlidesButtonsComponent } from './slides-troubleshooting/navigation-buttons/navigation-buttons.component';
import { BreadcrumbComponent } from './breadcrumbs/breadcrumbs.component';
import { SlidesTroubleshootingComponent } from './slides-troubleshooting/slides-troubleshooting.component';
import { CatalogService } from './catalog.service';
import { ButtonsListTroubleshootingComponent } from './buttons-list-troubleshooting/buttons-list-troubleshooting.component';
import { CoreTroubleshootingComponent } from './core-troubleshooting/core-troubleshooting.component';
import { TroubleshootingPage } from './troubleshooting.page';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProgressRingComponent } from './components/progress-ring/progress-ring.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { ConclusionTroubleshootingComponent } from './conclusion-troubleshooting/conclusion-troubleshooting.component';
import { MenuSlidesComponent } from './menu-slides/menu-slides.component';
import { AccordionDispositivosComponent } from './components/accordion/accordion-dispositivos/accordion-dispositivos.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { TsTimeComponent } from './components/ts-timer/ts-timer.component';
import { AccordionCallGuideComponent } from './components/accordion/accordion-call-guide/accordion-call-guide.component';
import { StbSelectorComponent } from './components/stb-selector/stb-selector.component';
import { PhoneInputComponent } from './components/ts-input/phone-input/phone-input.component';
import { ScrollSnappingComponent } from './components/scroll-snapping/scroll-snapping.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { StbListComponent } from './components/stb-list/stb-list.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TroubleshootingPage,
      }
    ])
  ],
  entryComponents: [MenuSlidesComponent],
  declarations: [
    TroubleshootingPage,
    NavigationSlidesButtonsComponent,
    BreadcrumbComponent,
    CoreTroubleshootingComponent,
    ButtonsListTroubleshootingComponent,
    SlidesTroubleshootingComponent,
    ConclusionTroubleshootingComponent,
    ProgressRingComponent,
    StopwatchComponent,
    TsTimeComponent,
    TsInputComponent,
    SsidInputComponent,
    PhoneInputComponent,
    StbSelectorComponent,
    PasswordInputComponent,
    AccordionDispositivosComponent,
    AccordionComponent,
    AccordionCallGuideComponent,
    MenuSlidesComponent,
    MenuSlidesComponent,
    RedesListComponent,
    ScrollSnappingComponent,
    WifiLabelComponent,
    WifiSignalDependenciesComponent,
    WifiSignalVerifierComponent,
    ImageSelectorComponent,
    StbListComponent,

  ],
  providers: [
    CatalogService
  ]
})
export class TroubleshootingPageModule { }
