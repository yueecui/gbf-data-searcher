export enum sizeEnum {
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
    XL = 'XL',
    XXL = 'XXL',
    XXXL = 'XXXL',
}

export enum screenEnum {
    SM = 576,
    MD = 768,
    LG = 992,
    XL = 1200,
    XXL = 1366,
    XXXL = 1600,
}

const screenMap = new Map<sizeEnum, number>();

screenMap.set(sizeEnum.SM, screenEnum.SM);
screenMap.set(sizeEnum.MD, screenEnum.MD);
screenMap.set(sizeEnum.LG, screenEnum.LG);
screenMap.set(sizeEnum.XL, screenEnum.XL);
screenMap.set(sizeEnum.XXL, screenEnum.XXL);
screenMap.set(sizeEnum.XXXL, screenEnum.XXXL);

export { screenMap };
