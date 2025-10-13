
const mySetInterval = (fn, time) => {
    let timer = null;
    const execute = () => {
        fn();
        timer = setTimeout(execute, time);
    };
    timer = setTimeout(execute, time);
    return {
        clear: () =>  clearTimeout(timer) 
    };
};
const test = mySetInterval(() => { console.log('loop'); }, 1000);
setTimeout(() => { test.clear(); console.log('end'); }, 5000);