Function.prototype.myCall = function(context, ...args) {
    if(typeof this !=='function'){
      throw new Error('not a function');
    }
    const globalObj = typeof window !== 'undefined' ? window : global;
    context = context || globalObj;
    const fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};
// this是改变this指向的函数，context是新的this指向。在context添加this方法，并执行，执行完删除这个属性。
// 原函数 a
function a(param) {
  console.log('this 指向：', this); // 打印 this 指向
  console.log('参数：', param);
}

// 目标对象 b
const b = { name: '我是b' };

// 调用 a.call(b, 'hello')
a.myCall(b, 'hello');