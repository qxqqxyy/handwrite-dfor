Function.prototype.myApply = function(context, args){
    if(typeof this !=='function'){
        throw new Error('not a function');
    }
    const globalObj = typeof window === 'undefined' ? global : window;
    context = context || globalObj;
    const fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...( args || []));
    delete context[fn];
    return result;
};
// this是改变this指向的函数，context是新的this指向。在context添加this方法，并执行，执行完删除这个属性。
// 定义一个数字数组
const numbers = [10, 5, 8, 20, 3];

// 用 apply 调用 Math.max，传入数组作为参数
const max = Math.max.myApply(null, numbers); 
// 等价于 Math.max(10, 5, 8, 20, 3)

console.log(max); // 输出：20