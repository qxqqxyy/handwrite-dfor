// 最大同时处理数量为maxNum
// 返回所有url请求的结果（有序） 错误结果记录为错误
const request = (urls, maxNum) => {
    return new Promise((resolve, reject) => {
        let cnt = 0;    // 进行中的数量
        let resolvedCnt = 0;
        const tmpQueue = [];
        const result = [];
        const length = urls.length;
        // 可以继续执行新的url请求
        const run = (curUrl, i) => {
            if (cnt < maxNum && resolvedCnt !== length) {
                // 开始执行
                cnt += 1;
                fetch(curUrl).then((res) => {
                    result[i] = {
                        state: 'fulfilled',
                        res
                    }
                }).catch((err) => {
                    result[i] = {
                        state: 'rejected',
                        err
                    }
                }).finally(() => {
                    resolvedCnt += 1;
                    cnt -= 1;
                    if (tmpQueue.length) {
                        const { index, url } = tmpQueue.shift();
                        run(url, index);
                    }
                    if (resolvedCnt === length) {
                        resolve(result);
                    }
                })
            } else {
                // 达到上限不能处理的请求
                tmpQueue.push({ index: i, url: curUrl });
            }
        }
        for (let j = 0; j < length; j++) {
            run(urls[j], j);
        }
    })
}
