Function.prototype.myBind = function (context, ...outerArgs) {

  if(typeof this !=='function'){
    throw new Error('not a function');
  }
  const _this = this; // 保存原函数的引用
  const globalObj = typeof window === 'undefined' ? global : window;
  context = context || globalObj;

  // 返回一个新函数，该函数执行时会绑定 context
  const boundFn = function (...innerArgs) {
    // 合并外层参数（bind 调用时传入）和内层参数（新函数调用时传入）
    const args = [...outerArgs, ...innerArgs];
    
    // 关键：如果新函数被当作构造函数（用 new 调用），this 应指向实例，而非 context
    if (this instanceof boundFn) {
      // 用原函数作为构造函数，传入合并后的参数，返回实例
      return new _this(...args);
    } else {
      // 普通调用：用 myCall 执行原函数，绑定 context 和参数
      return _this.call(context, ...args);
    }
  };
  
  // 修复原型链：让 boundFn 的实例能继承原函数的原型
  boundFn.prototype = Object.create(_this.prototype);
  boundFn.prototype.constructor = boundFn;
  
  return boundFn;
};
// 原函数
function printInfo(greeting) {
  console.log(`${greeting}, 我是${this.name}，年龄${this.age}`);
}

// 目标对象（新的this）
const person = { name: '张三', age: 20 };

// 用myBind绑定this
const boundPrint = printInfo.myBind(person, '你好');

// 调用绑定后的函数
boundPrint(); 

// 原函数：计算三个数的和
function add(a, b, c) {
  return a + b + c;
}

// 第一次绑定：固定第一个参数为10
const add10 = add.myBind(null, 10);

// 第二次调用：传入剩余参数
console.log(add10(5, 3)); // 10+5+3=18 → 预期输出：18

// 再固定第二个参数为20
const add10And20 = add10.myBind(null, 20);
console.log(add10And20(5)); // 10+20+5=35 → 预期输出：35
