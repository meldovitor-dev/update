import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./product-portfolio/product-portfolio.module').then(m => m.ProductPortfolioModule)
  },
  {
    path: 'sucesso',
    component: SuccessComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'diagnostico',
    loadChildren: () => import('./diagnostic/diagnostic.module').then(m => m.DiagnosticPageModule)
  },
  {
    path: 'visitas_tecnicas',
    loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule)
  },
  {
    path: 'deeplink-catalog',
    loadChildren: () => import('./deeplink-catalog/deeplink-catalog.module').then(m => m.DeeplinkCatalogPageModule)
  },
  {
    path: 'logout',
    redirectTo: '/'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
