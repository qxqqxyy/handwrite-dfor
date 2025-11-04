function myInstanceOf(obj, fn) {
    // 基本数据类型
    if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
        return false;
    }
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
        if (proto === fn.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}