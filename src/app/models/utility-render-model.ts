/* eslint-disable @typescript-eslint/member-delimiter-style */
export interface UtilityRenderButtonsModel {
    text: string;
    action: {
        name: string,
        params?: any
    };
    gaAction: string;
    icon?: string;
}

export interface UtilityPageModel {
    id: string;
    gaPageName: string;
    title?: string;
    paragraph?: string;
    image?: any;
    imageCaption?: string;
    buttons?: UtilityRenderButtonsModel[];
}
