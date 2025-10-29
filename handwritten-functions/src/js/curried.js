function curried(fn, ...args) {
    const length = fn.length;
    return function (...params) {
        let _args = [...args, ...params];
        if (_args.length < length) {
            return curried.call(this, fn, ..._args);
        }
        return fn.apply(this, _args);
    }
}
// 原函数：需要 3 个参数
function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curried(sum);

// 情况1：只传了1个参数，参数不够（1 < 3）
console.log(curriedSum(1,2,2)); // 输出 [Function (anonymous)]（等待剩余2个参数）

// 情况2：传了2个参数，仍不够（2 < 3）
console.log(curriedSum(1)(2)); // 输出 [Function (anonymous)]（等待最后1个参数）

// 情况3：传够3个参数，才会返回结果
console.log(curriedSum(1)(2)(3)); // 输出 6（正确结果）
