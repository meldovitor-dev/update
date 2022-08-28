import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeeplinkCatalogPage } from './deeplink-catalog.page';
import { DeepLinkFalhaMassivaComponent } from './deep-link-falha-massiva/deep-link-falha-massiva.component';

const routes: Routes = [
  {
    path: '',
    component: DeeplinkCatalogPage
  },
  {
    path: 'conclusao-falha-massiva',
    component: DeepLinkFalhaMassivaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeeplinkCatalogPageRoutingModule {}
