// Mock 异步任务生成器
function createMockTask(id, delay) {
    return () => new Promise(resolve => {
        console.log(`[开始] 任务 ${id}`);
        setTimeout(() => {
            console.log(`[完成] 任务 ${id} (耗时 ${delay}ms)`);
            resolve(id);
        }, delay);
    });
}

// 测试任务列表
const mockTasks = [
    createMockTask(1, 1000),
    createMockTask(2, 500),
    createMockTask(3, 800),
    createMockTask(4, 300),
    createMockTask(5, 1200),
    createMockTask(6, 400)
];
const limitPromiseMax = (promiseList,max) => {
    const queues = [...promiseList];    // 任务队列
    let resolvedCnt = 0;    // 已完成数量
    let cnt = 0;    // 当前进行数量
    const results = [];
    const run = (resolve) => {
        // 全部已完成
        if (resolvedCnt === promiseList.length) {
            resolve(results);
            return;
        }
        // 并发数量未上限，且存在剩余任务
        while (cnt < max && queues.length) {
            const promise = queues.shift()();
            cnt += 1;
            promise.then((res) => {
                results[resolvedCnt] = {
                    status: 'resolved',
                    value: res
                };
            }).catch((reason) => {
                results[resolvedCnt] = {
                    status: 'rejected',
                    reason: reason
                };
            }).finally(() => {
                cnt -= 1;
                resolvedCnt += 1;
                run(resolve);
            });
        }
    };
    return new Promise((resolve) => {
        run(resolve);
    });
};
// 执行并发控制（限制为 2 个）
limitPromiseMax(mockTasks, 2).then(results => {
    console.log('最终结果:', results);
});