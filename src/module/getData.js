import { luaTableToArray } from './luaTableToArray';

let dataCache;

/**
 * 获取写在页面中的数据
 * @returns {Array} 武器数据的array。需要注意内部可能依然有lua table
 */
export function getGbfData() {
    if (!dataCache) {
        if (typeof mw == 'undefined') {
            dataCache = luaTableToArray(window.DATA.weapon);
        } else {
            dataCache = luaTableToArray(mw.config.get('wgHuijiVars.GBFDATA').weapon);
        }
    }
    return dataCache;
}
