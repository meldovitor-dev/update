import { FooterTipsComponent } from './home-footer/footer-tips/footer-tips.component';
import { HomeFibraOfferComponent } from './home-fibra-offer/home-fibra-offer.component';
import { WildcardAreaComponent } from './wildcard-area/wildcard-area.component';
import { HomeProblemsComponent } from './home-problems/home-problems.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { SharedModule } from './../shared/shared.module';
import { CorePageModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { OfflineWarningComponent } from './offline-warning/offline-warning.component';
import { FooterLoginComponent } from './home-footer/footer-login/footer-login.component';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CorePageModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    HomeFooterComponent,
    FooterLoginComponent,
    FooterTipsComponent,
    HomeProblemsComponent,
    HomeFibraOfferComponent,
    WildcardAreaComponent,
    OfflineWarningComponent,
  ],
  providers: []
})
export class HomePageModule {}
