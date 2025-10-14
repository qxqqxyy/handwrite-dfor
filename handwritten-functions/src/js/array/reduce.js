Array.prototype.myReduce = function(callback, initialValue){
    if(typeof callback !== 'function'){
        throw new TypeError(`${callback} is not a function`);
    }
    const arr = this;
    let acc;
    const length = arr.length;
    let idx = 0;
    if(initialValue !== undefined){
        // 数组为空且无初始值 → 抛原生同款错误
        if (length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        acc = initialValue;
    }else{
        acc = arr[idx];
        idx++;
    }
    for(let i = idx;i<length;i++){
        acc = callback(acc,arr[i],i,arr);
    }
    return acc;
}