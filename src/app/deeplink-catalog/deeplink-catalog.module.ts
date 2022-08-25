import { DiagnosticPageModule } from './../diagnostic/diagnostic.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeeplinkCatalogPageRoutingModule } from './deeplink-catalog-routing.module';

import { DeeplinkCatalogPage } from './deeplink-catalog.page';
import { DeepLinkFalhaMassivaComponent } from './deep-link-falha-massiva/deep-link-falha-massiva.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeeplinkCatalogPageRoutingModule,
    SharedModule,
    DiagnosticPageModule
  ],
  declarations: [DeeplinkCatalogPage, DeepLinkFalhaMassivaComponent]
})
export class DeeplinkCatalogPageModule {}

