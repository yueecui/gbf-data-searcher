import type { ElementType, RarityType, SortType, UncapType, WeaponType, DisplayType, SpeciaFilterType } from '../enums/constant';

export interface FilterConfig {
    name: string;
    element: ElementType;
    rarity: RarityType;
    uncap: UncapType;
    weaponType: WeaponType;
    weaponCategory: number;
    specialFilter: SpeciaFilterType;
    skillFilter: {
        category: number;
        tag: string;
        skill: number;
    };
    sort: SortType;
    display: DisplayType;
}
