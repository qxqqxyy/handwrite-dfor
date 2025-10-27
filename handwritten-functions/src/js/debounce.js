const debounce = (func, delay)=>{
    let timer = null;
    return function(...args){
        if (timer) {
            clearTimeout(timer); 
            timer = null;
        };
        timer = setTimeout(()=>{
            func.apply(this, args);
        },delay)
    }
}
// 支持run cancel dependencies
const debounceWithDeps = (func, delay, deps) => {
    let timer = null;
    let preDeps = [...deps];
    const cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    // 浅比较
    const isDepsChanged = (pre, cur) => {
        if (pre.length !== cur.length) return false;
        return pre.some((item, index) => item != cur[index]);
    }
    const run = (...args) => {
        if (isDepsChanged(preDeps, deps)) {
            cancel();
            preDeps = [...deps];
        };
        cancel();
        timer = setTimeout(() => {
            func(...args);
            timer = null;
         }, delay);
    }
    return { run, cancel };
}