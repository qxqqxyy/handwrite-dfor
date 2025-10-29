Array.prototype.myReduce = function(callback, initialValue){
    if(typeof callback !== 'function'){
        throw new TypeError(`${callback} is not a function`);
    }
    const arr = this;
    let acc = initialValue !== undefined ? arr[0] : initialValue;
    const startIndex = initialValue !== undefined ? 1 : 0;
    for (let i = startIndex; i < arr.length; i++){
        acc = callback(acc, arr[i], i, arr);

    }
    return acc;
}
const test = [1, 2, 3];
console.log(test.myReduce((a, b) => { return a + b },0));