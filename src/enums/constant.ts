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

export const ElementTypeIconMap: Record<ElementType, string> = {
    [ElementType.ALL]: '',
    [ElementType.FIRE]: 'Icon_ele_fire',
    [ElementType.WATER]: 'Icon_ele_water',
    [ElementType.EARTH]: 'Icon_ele_earth',
    [ElementType.WIND]: 'Icon_ele_wind',
    [ElementType.LIGHT]: 'Icon_ele_light',
    [ElementType.DARK]: 'Icon_ele_dark',
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

export const WeaponTypeIconMap: Record<WeaponType, string> = {
    [WeaponType.ALL]: '',
    [WeaponType.SABRE]: 'icon_type_7_1',
    [WeaponType.DAGGER]: 'icon_type_7_2',
    [WeaponType.SPEAR]: 'icon_type_7_3',
    [WeaponType.AXE]: 'icon_type_7_4',
    [WeaponType.STAFF]: 'icon_type_7_5',
    [WeaponType.GUN]: 'icon_type_7_6',
    [WeaponType.MELEE]: 'icon_type_7_7',
    [WeaponType.BOW]: 'icon_type_7_8',
    [WeaponType.HARP]: 'icon_type_7_9',
    [WeaponType.KATANA]: 'icon_type_7_10',
    [WeaponType.MATERIAL]: '',
};

export enum UncapType {
    ALL = 0,
    THREE = 1,
    FOUR_PLUS = 2,
    FOUR = 3,
    FIVE = 4,
    SIX = 5,
}

export const UncapTypeNameMap: Record<UncapType, string> = {
    [UncapType.ALL]: '全部',
    [UncapType.THREE]: '★★★',
    [UncapType.FOUR_PLUS]: '★★★★～',
    [UncapType.FOUR]: '★★★★',
    [UncapType.FIVE]: '★★★★★',
    [UncapType.SIX]: '★★★★★★',
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


export enum DisplayType {
    UNCAP = 0,
    CH_NAME = 1,
    JP_NAME = 2,
    EN_NAME = 3,
    RELEASE_DATE = 4,
    UPDATE_DATE = 5,
    TYPE = 6,
    ID = 7,
    NONE = 99,
}

export const DisplayTypeNameMap: Record<DisplayType, string> = {
    [DisplayType.UNCAP]: '突破',
    [DisplayType.CH_NAME]: '中文名称',
    [DisplayType.JP_NAME]: '日文名称',
    [DisplayType.EN_NAME]: '英文名称',
    [DisplayType.RELEASE_DATE]: '实装日期',
    [DisplayType.UPDATE_DATE]: '更新日期',
    [DisplayType.TYPE]: '武器类型',
    [DisplayType.ID]: 'ID',
    [DisplayType.NONE]: '不显示',
};


export enum SpeciaFilterType {
    ALL = 0,
    HAS_AWAKEN = 1,
    HAS_EXSKILL = 2,
    // HAS_AWAKEN_EXSKILL = 3,
    HAS_REDSTAR = 4,
    HAS_CHARACTER = 5,
}

export const SpeciaFilterTypeNameMap: Record<SpeciaFilterType, string> = {
    [SpeciaFilterType.ALL]: '全部',
    [SpeciaFilterType.HAS_AWAKEN]: '有觉醒',
    [SpeciaFilterType.HAS_EXSKILL]: '有EX技能',
    // [SpeciaFilterType.HAS_AWAKEN_EXSKILL]: '有觉醒/EX技能',
    [SpeciaFilterType.HAS_REDSTAR]: '经特殊强化',
    [SpeciaFilterType.HAS_CHARACTER]: '可解锁角色',
};