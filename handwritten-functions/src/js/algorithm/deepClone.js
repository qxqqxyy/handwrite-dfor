function deepClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (map.has(obj)) {
        return map.get(obj);
    }
    let cloneObj;
    // 特殊情况 1. Data
    if (obj instanceof Date) {
        cloneObj = new Date(obj);
        map.set(obj, cloneObj);
        return cloneObj;
    }
    // 2. RegExp
    if (obj instanceof RegExp) {
        cloneObj = new RegExp(obj.source, obj.flags);
        cloneObj.lastIndex = obj.lastIndex;
        map.set(obj, cloneObj);
        return cloneObj;
    }
    if (Array.isArray(obj)) {
        cloneObj = [];
        map.set(obj, cloneObj);
        obj.forEach(item => {
            cloneObj.push(deepClone(item, map));
        })
    } else {
        // 对象
        cloneObj = {};
        map.set(obj, cloneObj);
        // Reflect.ownKeys()相比于Object.keys可以处理symbol属性和不可枚举
        Reflect.ownKeys(obj).forEach(key => {
            cloneObj[key] = deepClone(obj[key], map);
        })
    }
    return cloneObj;
}
const testObj = {
    '1': 1,
    '2': 2,
    '3': [1, 2,[1,2,3]]
}

console.log(deepClone(testObj));