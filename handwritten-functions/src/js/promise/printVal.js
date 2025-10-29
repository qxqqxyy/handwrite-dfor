const first = () =>
    new Promise((resolve, reject) => {
        console.log(1)  // 同步
        const p = new Promise((resolve, reject) => {
            console.log(2)    // 同步
            setTimeout(() => {
                console.log(3)  // 宏任务最后
                resolve(4)
            }, 0)
            resolve(5)    // p resolve 
        })
        resolve(6)  // first resolve
        p.then(arg => {
            console.log(arg)  // 5
        })
    })
first().then(arg => {
    console.log(arg)
})
console.log(7)  // 同步
// 1
// 2
// 7

// 5
// 6
// 3