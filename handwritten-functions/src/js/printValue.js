// 1. promise
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');

// 输出结果：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// 2.原型链
function Foo() {
    Foo.a = function () { console.log(1) };
    this.a = function () { console.log(2) };
}

Foo.prototype.a = function () { console.log(3) };
Function.prototype.a = function () { console.log(4) };
Foo.a();    // 4
let obj = new Foo();
obj.a();    // 2
Foo.a();    // 1
