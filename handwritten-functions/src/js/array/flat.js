//方法一：reduce实现
function flat(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
    }, []);
}

//方法二：递归
function flat(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flat(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

//方法三：toString和split结合
//先通过toString()把数组转成String对象，再结合split() 方法使用逗号分隔符将String对象分割
//成字符串数组，再用map函数将数组中的字符串转成数字
function flat(arr) {
    let res = [];
    return res = arr.toString().split(',').map(Number);
}

//方法四：es6的flat
//flat() 方法会按照一个可指定的深度递归遍历数组， 并将所有元素与遍历到的子数组中的
//元素合并为一个新数组返回
function flatDeep(arr) {
    return arr.flat(Infinity);
}