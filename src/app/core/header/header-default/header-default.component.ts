import { AnalyticsService } from 'src/app/core/analytics.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ConnectionState } from 'src/app/states/connection.state';
import { ConnectionModel } from 'src/app/models/connection.model';
import { Observable } from 'rxjs';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { ProductCodeEnum } from 'src/app/enums/product.enum';

@Component({
  selector: 'tecvirt-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.scss'],
})
export class HeaderDefaultComponent implements OnInit {
  @Input() title;
  @Input() product: string;
  @Select(ConnectionState.getConnection) connection$: Observable<
    ConnectionModel
  >;
  currentPage;
  constructor(
    private store: Store,
    public loginService: LoginService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() { }

  getProductName() {
    return this.product && this.product.includes('Fibra')
      ? 'Fibra'
      : this.product;
  }
  getKeyCpfOrCnpj() {
    return GeneralHelper.keyCpfOrCnpj(this.loginService.getUser().cpfOrCnpj);
  }
  getKeyIdentifier() {
    return GeneralHelper.keyIdentifier(this.loginService.getUser().productCode);
  }
  getCpfOrCnpj() {
    return GeneralHelper.mask(
      'cpfOrCnpj',
      this.loginService.getUser().cpfOrCnpj
    );
  }
  getIdentifier() {
    const telIdentifiers = [ProductCodeEnum.FIXO, ProductCodeEnum.BANDA_LARGA];
    if (telIdentifiers.includes(this.loginService.getUser().productCode)) {
      return GeneralHelper.mask(
        'phone',
        this.loginService.getUser().identifier
      );
    }
    return this.loginService.getUser().identifier;
  }
  publishMenuGa() {
    this.analyticsService.logEventGA('menu', 'click');
  }

}
