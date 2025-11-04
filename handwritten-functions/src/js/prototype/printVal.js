// 题目1
function Foo() {
    Foo.a = function () { console.log(1) };
    this.a = function () { console.log(2) };
}

Foo.prototype.a = function () { console.log(3) };
Foo.a = function () { console.log(4) };
Foo.a();    // 4
let obj = new Foo();
obj.a();    // 2
Foo.a();    // 1

console.log('题目2')
// 题目2
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
};

Foo.getName = function () {
    console.log(2);
};

Foo.prototype.getName = function () {
    console.log(3);
};

var getName = function () { // 此处覆盖变量提升的5
    console.log(4);
};

function getName() {    // 变量提升
    console.log(5);
};

Foo.getName();  // 2

getName();  // 4

Foo()//.getName();    // this.getName 这里的this是window？ 1

getName();  // 运行Foo()覆盖全局方法 1

new Foo.getName();  // 【.的优先级高于new】 2

new Foo().getName();  // 创建实例 原型链 3

new new Foo().getName();    // 3

// 题目3
console.log('题目3')
function Person() { }
var person = new Person();  //创建实例
Person.prototype = {
    name: 'Kevin',
    constructor: Person
};

console.log(person.name); // 输出：undefined 已有的实例不会跟随指向新原型，只会影响新创建的实例

// 题目4
console.log('题目4')
function Parent() {
    this.name = 'parent';
    this.colors = ['red', 'blue', 'green'];
}
function Child() { }
Child.prototype = new Parent(); // 原型链继承

var child1 = new Child();
var child2 = new Child();

console.log(child1.name); // 输出：parent
child1.colors.push('black');

console.log(child1.colors); // 输出：['red', 'blue', 'green', 'black']
console.log(child2.colors); // 输出：['red', 'blue', 'green', 'black'] (问题所在！) ：引用类型的属性被所有实例共享

// 题目5
console.log('题目5')
function Person() {
    this.name = "张三";
    this.age = 18;
    return 1;
}

const p = new Person();

// 谁创造了你 那你的__proto__ 属性就指向 谁的 prototype
// 对象都有__proto__ 属性 函数对象（可被new的）有prototype属性
// 我再来一遍;
/* p是从Person上创建的、p是实例对象 有__proto__ */
console.log(p.__proto__ === Person.prototype);  // true
/* Persion的原型链是对象 object 所创造*/
console.log(Person.prototype.__proto__ === Object.prototype);   // true *注意 没有function
/* Person是构造函数  被 function 所创造 */
console.log(Person.__proto__ === Function.prototype);   // true
/* 函数的原型链也是对象 被 Object 所创造*/
console.log(Function.prototype.__proto__ === Object.prototype); // true
/* 对象的原型链上什么呢？ null */
console.log(Object.prototype.__proto__ === null);   // true

// 题目6
console.log('题目6')
console.log(Object.prototype.__proto__)    // null
console.log(Function.prototype.__proto__)  // Object.prototype
console.log(Object.__proto__)              // Function.prototype {}


// 题目7
console.log('题目7')
var F = function () { };
Object.prototype.a = function () { console.log('a') };
F.prototype.b = function () { console.log('b') };
Function.prototype.c = function () { console.log('c') };
var f = new F();
f.a(), f.b();  //  a b

console.log(f.constructor.b === F.prototype.b); //   f.constrcutor 是 F， F.b 因为没有这个b属性，所以去它的原型链Function.prototype 去找，Function.prototype 上面没有发现b，所 结果: false
console.log(f.constructor.prototype.b === F.prototype.b); // f.constructor 是 F， F.prototype.b === F.prototype.b 一样的 结果: true
console.log(f.constructor.c === Function.prototype.c); // F是一个构造函数, F的直接prototype 是 Function.prototype, 所以这里的c也是拿的Function.prototype.c, 结果: true

console.log(f.constructor.a === Object.prototype.a); // f.constrcutor 是 F， F的直接prototype 链是 Function.prototype, 但是Function.prototype 没有这个a属性，于是继续向上查找，这里查找到了prototype链的顶端: Object.prototype, 然后 Object.prototype 上面有a属性，所以这里拿的就是 Object.prototype 上面的a属性， 结果: true

// 题目8
console.log('题目8')
function A() { }

function B(a) {
    // let this = {};
    // this.a = undefined 因为没有传a进来,因为它自己存在a属性，发生了屏蔽，不会去prototype上面去找

    this.a = a;

    // return this;
}

function C(a) {
    // let this = {};
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A().a); // 1
console.log(new B().a); // undefined 参考B 里面我写的解释。
console.log(new C(2).a); // 2

// 题目9
console.log('题目9')
var F = function () { }; // F.prototype.__proto__ === Function.prototype
Object.prototype.a = function () {
    console.log("a()");
};
Function.prototype.b = function () {
    console.log("b()");
};
var f = new F();
F.a(); // a()
F.b(); // b()
f.a(); // a()
// f.b(); // 报错  f.__proto__.__proto__ == F.prototype.__proto__ == Object.prototype 普通构造函数F的F.prototype是一个对象继承自Object
console.log(f.__proto__.__proto__ == F.prototype.__proto__, F.prototype.__proto__ == Function.__proto__, Function.__proto__ == Object.prototype)
// f 是一个对象, f.__proto__ === F.prototype, F.prototype.__proto__ === Object.prototype, 完全不关 Function.prototype 什么事情, Object.prototype上面并没有b方法，所以报错了
// 题目10
console.log('题目10')
// 考点: 属性屏蔽，原始值与引用值
function A() {
    this.name = 'a'
    this.color = ['green', 'yellow']
}

function B() {
}
B.prototype = new A();  // {name: a, color: []}
var b1 = new B()
var b2 = new B()

b1.name = 'change'; // 因为它自己并没有这个属性，它改的是它的prototype上面的，改了之后，这是一个原始值，发生屏蔽行为，自己把这个属性偷了

b1.color.push('black') // 引用值,首先，b1 是根本没有color这个属性的，它之所以能够访问 b1.color,完全是因为 它的prototype上面有这个属性，所以，它是直接返回了它prototype上面的值，color是prototype上面的一个引用值，它这里保存的是color在prototype里面的地址，b1 对这个color进行修改，prototype里面也一起改了

console.log(b1); // B {name: 'change'} 修改了，发生了屏蔽
console.log(b2); // B {}; b2 上面没有任何属性，全是prototype 上面的，
console.log(b1.name); // change
console.log(b2.name); // a 
console.log(b1.color); // [g, y, b]
console.log(b2.color); // [g, y, b]  b2 也没有color这个属性，沿着prototype上面的去找，prototype上面的color已经是 [g, y, b]了
