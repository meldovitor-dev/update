import { PwaBenefitsComponent } from './pwa-benefits/pwa-benefits.component';
import { RouterModule } from '@angular/router';
import { ProductPortfolioComponent } from './product-portfolio.component';
import { CorePageModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { ConsultOrShareComponent } from './consult-or-share/consult-or-share.component';
import { WizardComponent } from './wizard/wizard.component';
import { WizardDotsComponent } from './wizard/wizard-dots/wizard-dots.component';
import { GetPortfolioComponent } from './get-portfolio/get-portfolio.component';



@NgModule({
  declarations: [
    ProductPortfolioComponent,
    PortfolioListComponent,
    ConsultOrShareComponent,
    WizardComponent,
    WizardDotsComponent,
    PwaBenefitsComponent,
    GetPortfolioComponent],
  imports: [
    CommonModule,
    SharedModule,
    CorePageModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductPortfolioComponent
      },
      {
        path: 'wizard',
        component: WizardComponent
      }
    ])
  ]
})
export class ProductPortfolioModule { }
