import { ElementType, RarityType, UncapType, WeaponType } from '../enums/constant';
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

    get name(): string {
        if (this.raw.n === this.raw.nj) {
            return this.raw.n;
        } else {
            return this.raw.n + ' / ' + this.raw.nj;
        }
    }

    get chname(): string {
        return this.raw.n;
    }

    get jpname(): string {
        return this.raw.nj;
    }

    get enname(): string {
        return this.raw.ne;
    }

    get releaseTimestamp(): number {
        return this.raw.d;
    }

    get updateTimestamp(): number {
        return this.raw.l || this.raw.d;
    }

    get element(): ElementType {
        return this.raw.e;
    }

    get weaponType(): WeaponType {
        return this.raw.k;
    }

    get awaken(): number {
        if (!this.raw.aw || this.raw.aw.length === 0) return 0;
        return this.raw.aw[0];
    }

    get exSkill(): number {
        if (!this.raw.ex || this.raw.ex.length === 0) return 0;
        return this.raw.ex[0];
    }

    findKeyword(keyword: string): boolean {
        if (keyword === '') return true;
        if (this.raw.n.toLowerCase().includes(keyword)) return true;
        if (this.raw.nj.toLowerCase().includes(keyword)) return true;
        if (this.raw.ne.toLowerCase().includes(keyword)) return true;
        if (this.raw.nn.filter((n) => n.toLowerCase().includes(keyword)).length > 0) return true;
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

    hasUncap(uncap: UncapType): boolean {
        switch (uncap) {
            case UncapType.ALL:
                return true;
            case UncapType.THREE:
                return this.raw.v[1] === 3;
            case UncapType.FOUR_PLUS:
                return this.raw.v[1] >= 4;
            case UncapType.FOUR:
                return this.raw.v[1] === 4;
            case UncapType.FIVE:
                return this.raw.v[1] == 5;
            case UncapType.SIX:
                return this.raw.v[1] == 6;
        }
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

    hasSkill(skillCategory: number, availableSkillTypes: number[]): boolean {
        return (
            this.raw.sk.findIndex(
                (sk) => (skillCategory === 0 || skillCategory === sk.c) && availableSkillTypes.includes(sk.t),
            ) !== -1
        );
    }

    hasUnlockChar(): boolean {
        return this.raw.uc != null && this.raw.uc != 0;
    }

    hasAwaken(): boolean {
        return (this.raw.aw && this.raw.aw.length > 0);
    }

    hasExSkill(): boolean {
        return (this.raw.ex && this.raw.ex.length > 0);
    }

    hasAwakenOrExSkill(): boolean {
        return this.hasAwaken() || this.hasExSkill();
    }

    hasRedStar(): boolean {
        return this.raw.v[2] === 1;
    }

    getStarConfig(): string[] {
        const stars = new Array(this.raw.v[1]).fill('blue');
        stars.fill(this.raw.v[2] === 1 ? 'red' : 'yellow', 0, this.raw.v[0]);
        if (stars.length === 6) {
            stars[5] = 'purple';
        }
        return stars;
    }
}
