import { Weapon } from '../objects/Weapon';
import type {
    SkillCatrgoryMap,
    SkillSortConfig,
    SkillTagSortConfig,
    SkillTypeIdMap,
    WeaponFilterConfig,
    WeaponRaw,
    WeaponTagIdMap,
} from '../types/gbfdata';
import { convertLuaTable } from './convertLuaTable';

let dataCache: {
    [key: string]: any;
};

/**
 * 获取写在页面中的数据
 */
export function getData(key: string) {
    if (!dataCache) {
        if (window.mw) {
            dataCache = convertLuaTable(window.mw.config.get(`wgHuijiVars.${key}`));
        } else {
            dataCache = convertLuaTable(window.DATA!);
            window.DATA = dataCache;
        }
    }

    return dataCache;
}

/** lua写到页面上的数据 */
interface GbfData {
    skillCategoryMap: SkillCatrgoryMap;
    skillSortConfig: SkillSortConfig;
    skillTagSortConfig: SkillTagSortConfig;
    skillTypeIdMap: SkillTypeIdMap;
    weapon: Weapon[];
    weaponFilterConfig: WeaponFilterConfig;
    weaponTagIdMap: WeaponTagIdMap;
}

/**
 * 获取GBF数据
 */
export function getGbfData(): GbfData {
    const data = getData('GBFDATA');

    data.weapon = data.weapon.map((weapon: WeaponRaw) => new Weapon(weapon));

    return data as GbfData;
}
