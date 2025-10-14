const throttle = (func, delay)=>{
    let timer = null;
    let lastTime = 0;
    return function(...args){
        const now = Date.now();
        const remainTime = delay - (now-lastTime);
        if(remainTime<=0){
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            func.apply(this,args);
            lastTime = Date.now();
        }else if(!timer){
            timer = setTimeout(()=>{
                func.apply(this,args);
                lastTime = Date.now();
                timer = null;
            },remainTime);
        }
    }
}