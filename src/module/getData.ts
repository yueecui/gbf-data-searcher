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

let dataCache: any;

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
    weapon: WeaponRaw[];
    weaponFilterConfig: WeaponFilterConfig;
    weaponTagIdMap: WeaponTagIdMap;
}

/**
 * 获取所有lua写到页面的数据
 */
export function getGbfData() {
    return getData('GBFDATA') as GbfData;
}

/**
 * 获取武器数据
 */
export function getWeaponData() {
    const data = getGbfData();

    const weaponData = data.weapon.map((weapon) => new Weapon(weapon));

    return weaponData;
}

/**
 * 获取武器分类过滤器
 */
export function getWeaponFilterConfig() {
    const data = getGbfData();
    return generateWeaponFilter(data.weaponFilterConfig);
}

/**
 * 查询武器类型名称
 */
export function getWeaponTypeName(weaponTypeId: number) {
    if (weaponTypeId === 0) {
        return '全部';
    }

    const data = getGbfData();
    for (const [k, v] of Object.entries(data.weaponTagIdMap)) {
        if (v.i === weaponTypeId) {
            return k;
        }
    }
}

interface WeaponOptionItem {
    label: string;
    key: number | string;
    children?: WeaponOptionItem[];
    disabled?: boolean;
}

/** 递归生成武器分类过滤器选项 */
function generateWeaponFilter(filter: WeaponFilterConfig) {
    const result = [] as WeaponOptionItem[];
    for (const item of filter) {
        if (typeof item === 'number') {
            const name = getWeaponTypeName(item);
            if (name) {
                result.push({
                    label: name,
                    key: item,
                });
            }
        } else {
            result.push({
                label: item.name,
                key: item.name,
                children: generateWeaponFilter(item.children),
            });
        }
    }
    return result;
}

/** 生成技能加成类型过滤器 */
export function generateSkillCategoryFilter() {
    const { skillCategoryMap } = getGbfData();
    const categoryArray = Object.keys(skillCategoryMap).map((key) => {
        return {
            label: key === '' ? '无' : key,
            key: skillCategoryMap[key],
        };
    });
    categoryArray.sort((a, b) => a.key - b.key);
    return categoryArray;
}

/** 生成属性标签过滤器 */
export function generateSkillTagFilter() {
    const { skillTagSortConfig } = getGbfData();
    const tagArray = skillTagSortConfig.map((tagName) => {
        return {
            label: tagName,
            key: tagName,
        };
    });
    return tagArray;
}

/** 生成属性标签过滤器 */
export function generateSkillTypeFilter(tag: string) {
    const { skillSortConfig, skillTypeIdMap } = getGbfData();
    return skillSortConfig
        .filter((tagName) => (tag === '' ? true : skillTypeIdMap[tagName].t.includes(tag)))
        .map((tagName) => {
            return {
                label: tagName,
                key: skillTypeIdMap[tagName].i,
            };
        });
}

/** 生成属性标签过滤器 */
export function generateAvailableSkillTypeList(tag: string) {
    const { skillSortConfig, skillTypeIdMap } = getGbfData();
    return skillSortConfig
        .filter((tagName) => (tag === '' ? true : skillTypeIdMap[tagName].t.includes(tag)))
        .map((tagName) => skillTypeIdMap[tagName].i);
}
