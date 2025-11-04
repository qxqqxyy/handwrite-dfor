// 最大同时处理数量为maxNum
// 返回所有url请求的结果（有序） 错误结果记录为错误
const request = (urls, maxNum) => {
    return new Promise((resolve, reject) => {
        let cnt = 0;    // 进行中的数量
        let resolvedCnt = 0;
        const result = [];
        const length = urls.length;
        let nextIndex = 0;
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
                    if (resolvedCnt === length) {
                        resolve(result);
                    }
                    if(nextIndex<length){
                        run(urls[nextIndex], nextIndex);
                        nextIndex+=1;
                    }
                })
            }
        }
        for (let j = 0; j < maxNum && j<length; j++) {
            run(urls[j], j);
            nextIndex += 1;
        }
    })
}
