function flatten(obj, pre = '', res = {}) {
    // 基本类型
    Object.keys(obj).forEach(key => {
        const isArray = Array.isArray(obj);
        const newKey = pre ?
            (isArray ? `${pre}[${key}]` : `${pre}.${key}`) : key;
        const value = obj[key];
        // 基本类型
        if (value == null) {
            return res
        } else if (typeof value === 'object') {
            flatten(value, newKey, res);
        } else {
            res[newKey] = value;
        }
    });
    return res;
}
const res = {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null,
};
console.log(flatten(res));