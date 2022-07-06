/**
 * 将Lua的数字下标table转为js的Array
 * @param {object} table 索引值必须为依次排序的数字下标
 * @returns {Array} 转换好的Array
 */
export function luaTableToArray(table) {
    const key_list = Object.keys(table);
    key_list.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    const result = [];
    for (const key of key_list) {
        result.push(table[key]);
    }
    return result;
}
