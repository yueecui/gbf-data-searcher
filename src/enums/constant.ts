export enum ElementType {
    ALL = 0,
    FIRE = 1,
    WATER = 2,
    EARTH = 3,
    WIND = 4,
    LIGHT = 5,
    DARK = 6,
}

export const ElementTypeNameMap: Record<ElementType, string> = {
    [ElementType.ALL]: '全部',
    [ElementType.FIRE]: '火',
    [ElementType.WATER]: '水',
    [ElementType.EARTH]: '土',
    [ElementType.WIND]: '风',
    [ElementType.LIGHT]: '光',
    [ElementType.DARK]: '暗',
};

export enum RarityType {
    ALL = 0,
    N = 1,
    R = 2,
    SR = 3,
    SSR = 4,
}

export const RarityTypeNameMap: Record<RarityType, string> = {
    [RarityType.ALL]: '全部',
    [RarityType.N]: 'N',
    [RarityType.R]: 'R',
    [RarityType.SR]: 'SR',
    [RarityType.SSR]: 'SSR',
};

export enum WeaponType {
    ALL = 0,
    SABRE = 1,
    DAGGER = 2,
    SPEAR = 3,
    AXE = 4,
    STAFF = 5,
    GUN = 6,
    MELEE = 7,
    BOW = 8,
    HARP = 9,
    KATANA = 10,
    MATERIAL = 99,
}

export const WeaponTypeNameMap: Record<WeaponType, string> = {
    [WeaponType.ALL]: '全部',
    [WeaponType.SABRE]: '剑',
    [WeaponType.DAGGER]: '短剑',
    [WeaponType.SPEAR]: '枪',
    [WeaponType.AXE]: '斧',
    [WeaponType.STAFF]: '杖',
    [WeaponType.GUN]: '铳',
    [WeaponType.MELEE]: '格斗',
    [WeaponType.BOW]: '弓',
    [WeaponType.HARP]: '乐器',
    [WeaponType.KATANA]: '刀',
    [WeaponType.MATERIAL]: '素材',
};

export enum UncapType {
    ALL = 0,
    THREE = 1,
    FOUR_PLUS = 2,
    FOUR = 3,
    FIVE = 4,
}

export const UncapTypeNameMap: Record<UncapType, string> = {
    [UncapType.ALL]: '全部',
    [UncapType.THREE]: '★★★',
    [UncapType.FOUR_PLUS]: '★★★★～',
    [UncapType.FOUR]: '★★★★',
    [UncapType.FIVE]: '★★★★★',
};

export enum SortType {
    RELEASE_DATE_DESC = 0,
    UPDATE_DATA_DESC = 1,
    ELEMENT = 2,
    TYPE = 3,
}

export const SortTypeNameMap: Record<SortType, string> = {
    [SortType.RELEASE_DATE_DESC]: '最新登场',
    [SortType.UPDATE_DATA_DESC]: '最近更新',
    [SortType.ELEMENT]: '属性',
    [SortType.TYPE]: '类型',
};
