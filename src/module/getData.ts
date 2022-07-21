import { luaTableToArray } from './luaTableToArray';

let dataCache;

/**
 * 获取写在页面中的数据
 * @returns {Array} 武器数据的array。需要注意内部可能依然有lua table
 */
export function getGbfData() {
    if (!dataCache) {
        if (window.mw) {
            dataCache = luaTableToArray(window.mw.config.get('wgHuijiVars.GBFDATA').weapon);
        } else {
            dataCache = luaTableToArray(window.DATA!.weapon);
        }
    }
    return dataCache;
}
