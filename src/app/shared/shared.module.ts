import { LoadingModalComponent } from './../modals/loading-modal/loading-modal/loading-modal.component';
import { ViewmoreButtonComponent } from './viewmore-button/viewmore-button.component';
import { VideoEmbedComponent } from './../modals/video-embed-component/video-embed.component';
import { PipeModule } from './../pipe/pipe.module';
import { OtherAppsComponent } from './../modals/other-apps/other-apps.component';
import { SharedButtonComponent } from './shared-button/shared-button.component';
import { FibraOfferComponent } from './../modals/fibra-offer/fibra-offer.component';
import { CardMultiComponent } from './cards/card-multi/card-multi.component';
import { CardSingleComponent } from './cards/card-single/card-single.component';
import { OfflineHandlerComponent } from './../modals/offline-handler/offline-handler.component';
import { NotificationAreaComponent } from './notification-area/notification-area.component';
import { LoadingComponent } from './loading/loading.component';
import { UnloggedAreaComponent } from './unlogged-area/unlogged-area.component';
import { TermsOfUseDescriptionComponent } from './terms-of-use-description/terms-of-use-description.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ButtonComponent } from './button/button.component';
import { CardDeckComponent } from './cards/card-deck/card-deck.component';
import { CardAgendamentoComponent } from './cards/card-agendamento/card-agendamento.component';
import { LoginComponent } from './../modals/login/login.component';
import { EventListenerDirective } from './../directives/event-listener.directive';
import { IonicModule } from '@ionic/angular';
import { InputDefaultComponent } from './input-default/input-default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSpecialAreaComponent } from '../modals/login/login-special-area/login-special-area.component';
import { KeepMeLoggedInComponent } from './keep-me-logged-in/keep-me-logged-in.component';
import { NotificationModalComponent } from './notification-area/notification-modal/notification-modal.component';
import { SpeedometerComponent } from './speedometer/speedometer.component';
import { StateCircleComponent } from './state-circle/state-circle.component';
import { AlignTimerComponent } from './align-timer/align-timer.component';
import { AppRateComponent } from './app-rate/app-rate.component';
import { LoginHeaderComponent } from '../modals/login/login-header/login-header.component';
import { LoginMessagesComponent } from '../modals/login/login-messages/login-messages.component';
import { DotsLoadingComponent } from './dots-loading/dots-loading.component';
import { HeaderComponent } from '../core/header/header.component';
import { HeaderDefaultComponent } from '../core/header/header-default/header-default.component';
import { HeaderTsComponent } from '../core/header/header-ts/header-ts.component';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { ClipboardDirective } from '../directives/clipboard.directive';
import { UtilityRenderComponent } from './utility-render/utility-render.component';
import { NotificationListComponent } from './notification-area/notification-modal/notification-list/notification-list.component';
import { CardDiagnosticComponent } from './cards/card-diagnostic/card-diagnostic.component';
import { AntiRobotComponent } from '../modals/anti-robot/anti-robot.component';
import { InstallPwaButtonComponent } from './install-pwa/install-pwa-button/install-pwa-button.component';
import { InstallPwaFooterComponent } from './install-pwa/install-pwa-footer/install-pwa-footer.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { OiProductsComponent } from '../modals/oi-products/oi-products.component';
import { LinkSharedComponent } from './link-shared/link-shared.component';
import { PhoneNumberModalComponent } from '../modals/phone-number-modal/phone-number-modal.component';
import { InfoPopoverComponent } from './info-popover/info-popover.component';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { ContractSelectorComponent } from '../modals/contract-selector/contract-selector.component';
import { WifiInfoResultComponent } from './wifi-info-result/wifi-info-result.component';
import { ClientFeedbackComponent } from '../shared/client-feedback/client-feedback.component';
import { ProgressionBarComponent } from '../shared/client-feedback/progression-bar/progression-bar.component';
import { EmotionScaleComponent } from '../shared/client-feedback/emotion-scale/emotion-scale.component';
import { FeedbackListComponent } from '../shared/client-feedback/feedback-list/feedback-list.component';
import { LeaveButtonsComponent } from '../shared/client-feedback/leave-buttons/leave-buttons.component';
import { DesktopFooterComponent } from './desktop-footer/desktop-footer.component';
import { MoiTokenComponent } from '../modals/moi-token/moi-token.component';
import { CobreMigracaoComponent } from '../modals/cobre-migracao/cobre-migracao.component';
import { CobreExtraStepComponent } from '../modals/cobre-extra-step/cobre-extra-step.component';
import { GetPortfolioComponent } from '../modals/get-portfolio-modal/get-portfolio-modal.component';
import { OiExpertBannerComponent } from './oi-expert-banner/oi-expert-banner.component';


@NgModule({
  declarations: [
    ContractSelectorComponent,
    ButtonComponent,
    CardAgendamentoComponent,
    CardSingleComponent,
    CardMultiComponent,
    CardDeckComponent,
    DesktopFooterComponent,
    EventListenerDirective,
    ClipboardDirective,
    ClickOutsideDirective,
    InputDefaultComponent,
    HeaderComponent,
    HeaderDefaultComponent,
    HeaderTsComponent,
    LoginComponent,
    LoginHeaderComponent,
    LoginMessagesComponent,
    NotificationAreaComponent,
    NotificationModalComponent,
    NotificationListComponent,
    TermsOfUseComponent,
    TermsOfUseDescriptionComponent,
    UnloggedAreaComponent,
    LoadingComponent,
    OfflineHandlerComponent,
    LoadingModalComponent,
    LoginSpecialAreaComponent,
    KeepMeLoggedInComponent,
    SpeedometerComponent,
    StateCircleComponent,
    AlignTimerComponent,
    AppRateComponent,
    OtherAppsComponent,
    OiProductsComponent,
    FibraOfferComponent,
    SharedButtonComponent,
    ViewmoreButtonComponent,
    DotsLoadingComponent,
    CardModalComponent,
    InstallPwaButtonComponent,
    InstallPwaFooterComponent,
    UtilityRenderComponent,
    CardDiagnosticComponent,
    AntiRobotComponent,
    VideoEmbedComponent,
    ImageCarouselComponent,
    LinkSharedComponent,
    PhoneNumberModalComponent,
    InfoPopoverComponent,
    WifiInfoResultComponent,
    ClientFeedbackComponent,
    ProgressionBarComponent,
    EmotionScaleComponent,
    FeedbackListComponent,
    LeaveButtonsComponent,
    MoiTokenComponent,
    CobreMigracaoComponent,
    CobreExtraStepComponent,
    GetPortfolioComponent,
    OiExpertBannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule
  ]
})
export class SharedModule { }
