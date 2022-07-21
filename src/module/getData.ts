import type { Weapon } from '../types/weapon';
import { convertLuaTable } from './convertLuaTable';

export enum GameDataType {
    Weapon = 'weapon',
}

interface GameDataTypeMap {
    [GameDataType.Weapon]: Weapon;
}

let dataCache: {
    [key: string]: any;
};

/**
 * 获取写在页面中的数据
 * @returns {Array} 武器数据的array。需要注意内部可能依然有lua table
 */
export function getGbfData<T extends GameDataType>(type: T): GameDataTypeMap[T][] {
    if (!dataCache) {
        if (window.mw) {
            dataCache = convertLuaTable(window.mw.config.get('wgHuijiVars.GBFDATA'));
        } else {
            dataCache = convertLuaTable(window.DATA!);
        }
    }

    return dataCache[type];
}
