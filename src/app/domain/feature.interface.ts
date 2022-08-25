import { InteractionEnum } from './interactions';
import { FeatureEnum } from 'src/app/enums/feature.enum';

export interface FeatureInterface {
    displayName: string;
    icon: string;
    featureCode: FeatureEnum;
    displayOnHome: string;
    // eslint-disable-next-line @typescript-eslint/member-delimiter-style
    catalogConfig: {name: string, initialPage: number | string};
    renderRouter: string;
    interactions: InteractionEnum[];
    diagnostic: InteractionEnum[];
    protocol?: string;
    ga: string;
    skipDiagnostic?: boolean;
}

const platforms = ['ios', 'mobileweb', 'desktop', 'android', 'ipad', 'iphone', 'phablet',
  'tablet', 'cordova', 'capacitor', 'electron', 'pwa', 'mobile', 'hybrid'] as const;
export type PlatformType = typeof platforms[number];
