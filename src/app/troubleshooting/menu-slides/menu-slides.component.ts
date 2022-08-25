import { AnalyticsService } from 'src/app/core/analytics.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'tecvirt-menu-slides',
    templateUrl: './menu-slides.component.html',
    styleUrls: ['./menu-slides.component.scss'],
})
export class MenuSlidesComponent implements OnInit {
    items = [];
    buttonsAccordion = [];
    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private analyticsService: AnalyticsService) { }

    ngOnInit() {
        const slides = this.navParams.get('slides');
        slides.forEach((el, idx) => {
            this.items.push({
                gaLabel: el.gaLabel,
                section: el.section,
                description: el.label,
                id: idx,
            });
        });
        if (this.items.find(el => !!el.section)) {
            this.createCategories();
        }
    }
    public createCategories() {
        const categories = this.items
            .map(its => its.section)
            .filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });
        categories.forEach(element => {
            this.buttonsAccordion.push({
                open: false,
                title: element,
                items: this.getItemsBySections(element)
            });
        });
    }
    dismissModal(item?) {
        this.modalCtrl.dismiss(item);
    }
    closeButtonAction() {
      const gaAction = 'fechar';
      this.analyticsService.logEventGA(gaAction, 'click');
      this.dismissModal();
    }
    public getItemsBySections(section: string) {
        return this.items.filter(el => el.section === section);
    }
    public expandAccordion(item) {
        let option;
        this.buttonsAccordion.forEach((el) => {
          if (item === el) {
            el.open = !el.open;
            option = el.open;
          } else {
            el.open = false;
          }
          return el;
        });
      }

}
