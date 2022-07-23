import type { ElementType, RarityType, WeaponType } from '../enums/constant';
import type { WeaponRaw } from '../types/gbfdata';

/**
 * 将武器生成实例，方便处理原有数据缩写的不便
 */
export class Weapon {
    raw: WeaponRaw;
    constructor(weapon: WeaponRaw) {
        this.raw = weapon;
    }

    get id(): string {
        return this.raw.id;
    }

    get index(): number {
        return this.raw.i;
    }

    findKeyword(keyword: string): boolean {
        if (keyword === '') return true;
        if (this.raw.n.includes(keyword)) return true;
        if (this.raw.nj.includes(keyword)) return true;
        if (this.raw.ne.includes(keyword)) return true;
        if (this.raw.nn.filter((n) => n.includes(keyword)).length > 0) return true;
        return false;
    }

    isElement(element: ElementType): boolean {
        if (element === 0) return true;
        return this.raw.e === element;
    }

    isRarity(rarity: RarityType): boolean {
        if (rarity === 0) return true;
        return this.raw.s === rarity;
    }

    isType(weaponType: WeaponType): boolean {
        if (weaponType === 0) return true;
        return this.raw.k === weaponType;
    }

    isCategory(category: number): boolean {
        if (category === 0) return true;
        return this.raw.c.includes(category);
    }

    hasSkillCategory(skillCategory: number): boolean {
        if (skillCategory === 0) return true;
        return this.raw.sk.findIndex((sk) => sk.c === skillCategory) !== -1;
    }

    hasSkillType(skillTypes: number[]): boolean {
        return this.raw.sk.findIndex((sk) => skillTypes.includes(sk.t)) !== -1;
    }
}
