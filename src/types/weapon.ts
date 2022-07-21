import type { ElementType, RarityType, WeaponType } from '../enums/constant';

export interface Weapon {
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
    /** 最后更新的时间戳 */
    l: number;
    /** 技能类型id标签 */
    sk: number[];
}
