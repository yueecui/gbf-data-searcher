import type { ElementType, RarityType, SortType, UncapType, WeaponType } from '../enums/constant';

export interface FilterConfig {
    name: string;
    element: ElementType;
    rarity: RarityType;
    uncap: UncapType;
    weaponType: WeaponType;
    weaponCategory: number;
    skillFilter: {
        category: number;
        tag: string;
        skill: number;
    };
    sort: SortType;
}
