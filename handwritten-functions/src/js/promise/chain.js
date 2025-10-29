// // 定义 hello 对象，基于 Promise 任务队列实现链式调用
const hello = (() => {
    // 存储任务队列的状态：当前Promise链、数据存储
    let currentPromise = Promise.resolve(); // 初始化为已完成的Promise，启动链式调用
    return {
        // 1. 设置名称
        name(value) {
            // 向任务队列添加“设置name”的任务
            console.log(value);
            return this; // 返回自身，支持链式调用
        },

        // 2. 延迟指定秒数（封装sleep功能）
        sleep(seconds) {
            currentPromise = currentPromise.then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, seconds * 1000); // 转换为毫秒
                });
            });
            return this;
        },

        // 3. 设置喜欢的事物
        like(value) {
            currentPromise = currentPromise.then(() => {
                console.log(value);
            });
            return this;
        },
    };
})();

// // ---------------- 测试链式调用 ----------------
// hello
//     .name('George')       // 第一步：设置名称为 George
//     .sleep(3)             // 第二步：等待 3 秒
//     .like('sports')       // 第三步：设置喜欢 sports

class Hello{
    constructor() {
        this.promise = Promise.resolve();
    }
    name(str) {
        console.log(str);
        return this;
    }
    sleep(time) {
        this.promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time * 1000);
        })
        return this;
    }
    like(str) {
        this.promise.then(() => {
            console.log(str);
        })
        return this;
    }
}
// const hello = new Hello();
hello
    .name('George')       // 第一步：设置名称为 George
    .sleep(3)             // 第二步：等待 3 秒
    .like('sports')       // 第三步：设置喜欢 sports