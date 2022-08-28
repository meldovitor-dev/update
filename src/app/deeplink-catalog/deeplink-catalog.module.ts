import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeeplinkCatalogPageRoutingModule } from './deeplink-catalog-routing.module';

import { DeeplinkCatalogPage } from './deeplink-catalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeeplinkCatalogPageRoutingModule
  ],
  declarations: [DeeplinkCatalogPage]
})
export class DeeplinkCatalogPageModule {}
