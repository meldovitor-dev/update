import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticPage } from './diagnostic.page';
import { DiagnosticCoreComponent } from './diagnostic-core/diagnostic-core.component';
import { DiagnosticBlocksComponent } from './diagnostic-blocks/diagnostic-blocks.component';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticPage,
    children: [{
      path: 'consultas',
      component: DiagnosticCoreComponent,
    }]

  },
  {
    path: 'conclusao',
    component: DiagnosticBlocksComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticPageRoutingModule {}
