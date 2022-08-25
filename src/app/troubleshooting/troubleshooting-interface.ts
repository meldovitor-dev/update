import { InteractionEnum } from './../domain/interactions';
export interface LayoutCatalogModel {
    slides?: any[];
    alert?: AlertCalogModel;
    accordion?: 'connected-devices' | 'call-guide';
    alphabetical?: boolean;
    wifiLabel?: true;
    selectUnknownDevices?: boolean;
    contentTop?: boolean;
    hiddenHeaderBackButton?: boolean;
    chat?: boolean;
    spin?: boolean;
    input?: string;
    loading?: string;
    loadingLabel?: string;
    customClasses?: string;
    title?: string;
    theme?: string;
    paragraph?: string;
    imageCaption?: string;
    image?: string;
    imageSelector?: ImageSelectorModel[];
    buttons?: ButtonCatalogModel[];
    linkShare?: LinkCatalogModel;
    feedback?: boolean;
    omnichannel?: boolean;
    actionGenerated?: string;
    diagnosticAction?: string;
    stage?: string;
    interaction?: InteractionEnum;
    accordionContent?: AccordionCatalog[];
    stbSelect?: boolean;
    stbList?:boolean;
    networkList?: boolean;
    noFeedback?: boolean;
    scrollSnap?: string;
    wifiInfo?: boolean;
    wifiDependencies?: boolean;
    wifiInfoResult?: boolean;
}

export interface AccordionCatalog {
    title: string;
    subtitle: string;
    gaAction?: string;
    paragraphs: string[];
    image: string;
    action: string;
}

export interface AlertCalogModel {
    id?: string;
    title: string;
    message?: string;
    gaPageName?: string;
    buttons: ButtonCatalogModel[];
}

export interface ButtonCatalogModel {
    text: string;
    gaAction: string;
    customClasses?: string;
    isDisabled?: boolean;
    action?: string;
    display?: boolean;
}

export interface LinkCatalogModel {
  label?: string;
  link?: string;
  captionLabel?: string;
  gaAction?: string;
  action?: string;
}
export interface StateCatalogModel {
    type?: string; // default
    on: EventCatalogModel[];
}

export interface EventCatalogModel {
    name: string;
    action: {
        call: string,
        params?: any,
    };
}

export interface CatalogModel {
    id: number | string;
    description?: string;
    gaPageName: string;
    layout?: LayoutCatalogModel;
    state: StateCatalogModel;
    pageConfig?: PageConfigModel;
    fluxo?: string;
}

export interface PageConfigModel {
    feedback?: {
        gaPageName: string,
        title: string,
        message?: string,
        buttons: ButtonCatalogModel[],
        state: {
            name: string,
            action: {
                call: string,
                params?: any,
            }
        },
    };
}

export interface ConfigModel {
    alert?: string;
    alertReboot?: string;
    alertModem?: string;
    successId?: string;
}

export interface ConclusionModel {
    id: string;
    gaPageName: string;
    fluxo?: string;
    title: string;
    paragraph?: string;
    buttons: ButtonCatalogModel[];
}

export interface CatalogDTOProperty {
    catalog: CatalogModel[];
    initialPage: number | string;
    optionalParams?: any;
}

export interface CatalogDTO {
    authenticated: CatalogDTOProperty;
    default: CatalogDTOProperty;
    hdmOffline?: CatalogDTOProperty;
}

export interface ImageSelectorModel {
  stateName: string;
  imgPath: string;
  gaName: string;
}

export interface FrequencyNetwork {
  label: string;
  networkList: any[];
}

export interface WifiInfoInterface {
  rede24?: NetworkWifiInfoInterface;
  rede5?: NetworkWifiInfoInterface;
  lastUpdate?: string;
  isCompatible5Ghz?: boolean;
  planoContratado?: string;
}

export interface NetworkWifiInfoInterface {
  nomeDaRede: string;
  bssid: any;
  macAddress: any;
  linkSpeed: string;
  velocidadeAparelho: string;
  realFrequency: number;
  RSSI: number;
  level: number;
  frequency: string;
  bandWidth: string;
  isRede5Ghz: boolean;
  success?: boolean;
  fluxo?: string;
}
