// 通过页面传来的数据的类型

import type { ElementType, RarityType, WeaponType } from '../enums/constant';

/** 技能分类（普通/方阵/EX等） */
export type SkillCatrgoryMap = Record<string, number>;

/** 技能类型（攻刃、神威）的排列顺序 */
export type SkillSortConfig = string[];

/** 技能标签（ATK/HP）的排列顺序 */
export type SkillTagSortConfig = string[];

/** 技能类型的ID对照表 */
export type SkillTypeIdMap = Record<
    string,
    {
        i: number;
        t: string[];
    }
>;

/** 武器原始数据 */
export interface WeaponRaw {
    id: string;
    /** 索引 */
    i: number;
    /** 中文名/日文名 */
    n: string;
    /** 日文名 */
    nj: string;
    /** 英文名 */
    ne: string;
    /** 昵称 */
    nn: string[];
    /** 发行日期的时间戳 */
    d: number;
    /** 发行年份 */
    y: string;
    /** 星级 */
    s: RarityType;
    /** 属性 */
    e: ElementType;
    /** 武器类型 */
    k: WeaponType;
    /** 过滤用tag id */
    c: number[];
    /** 突破上限/终突上限/是否为红色星星 */
    v: [number, number, 1 | 0];
    /** 觉醒 */
    aw: number[];
    /** 解锁角色 */
    uc: number;
    /** EX技能 */
    ex: number[];
    /** 最后更新的时间戳 */
    l: number;
    /** 技能 */
    sk: {
        /** type id */
        t: number;
        /** category id */
        c: number;
        /** skill name */
        n: string;
    }[];
}

/** 武器过滤器配置 */
export type WeaponFilterConfig = (
    | {
        name: string;
        children: WeaponFilterConfig;
    }
    | number
)[];

/** 武器标签Id MAP */
export type WeaponTagIdMap = Record<
    string,
    {
        i: number;
        o?: string;
    }
>;

/** 武器觉醒配置 */
export type AwakenConfig = Record<
    string,
    string[]
>;
