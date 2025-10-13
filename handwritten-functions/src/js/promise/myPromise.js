function MyPromise(fn) {
  let self = this;
  this.state = 'pending';
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value){
    if(value instanceof MyPromise){
      return value.then(resolve,reject);
    }
    setTimeout(()=>{
      if(self.state === 'pending'){
        self.state = 'resolved';
        self.value = value;
        self.resolvedCallbacks.forEach(cb => cb(value));
      }
    },0);
  }
  function reject(value){
    setTimeout(()=>{
      if(self.state === 'pending'){
        self.state = 'rejected';
        self.value = value;
        self.rejectedCallbacks.forEach(cb => cb(value));
      }
    },0);
  }

  try {
    fn(resolve,reject);
  } catch (error) {
    reject(error);
  }
}
MyPromise.resolve = function(value){
  if(value instanceof MyPromise){
    return value
  }
  return new MyPromise(resolve=>{
    resolve(value);
  })
}
MyPromise.reject = function(value){
  return new MyPromise((_,reject)=>{
    reject(value);
  })
}
MyPromise.prototype.then = function(onResolved,onRejected) {
    const self = this;
    // 类型检查
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r};
    return new MyPromise((resolve,reject)=>{
      const handleResolved = ()=>{
        try {
          const result = onResolved(self.value);
          if(result instanceof MyPromise){
            result.then(resolve,reject);
          }else{
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };
      const handleRejected = ()=>{
        try {
          const result = onRejected(self.value);
          if(result instanceof MyPromise){
            result.then(resolve,reject);
          }else{
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };
      if(this.state ==='pending'){
        this.resolvedCallbacks.push(handleResolved);
        this.rejectedCallbacks.push(handleRejected);
      }else if(this.state === 'resolved'){
        setTimeout(handleResolved,0);
      }else{
        setTimeout(handleRejected,0);
      }
    });
};
MyPromise.prototype.catch = function(onRejected){
  onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r};
  return this.then(null,onRejected);
};
MyPromise.prototype.finally = function(onFinally){
  onFinally = typeof onFinally === 'function' ? onFinally: ()=>{} ;
  return this.then((value)=>{
    onFinally();
    return value;
  },(error)=>{
    onFinally();
    throw error;
  });
}
MyPromise.all = function(promiseList){
  return new MyPromise((resolve,reject)=>{
    // 类型检查
    if(!Array.isArray(promiseList)){
      throw new Error('promiseList must be an array');
    }
    const num = promiseList.length;
    if(!num){
      resolve([]);
      return;
    }
    let resolvedCnt = 0;
    const result = [];
    for(let i=0;i<num;i++){
      MyPromise.resolve(promiseList[i]).then(res=>{
        result[i] = res;
        resolvedCnt++;
        if(resolvedCnt === num){
          resolve(result);
        }
      },error=>{
        reject(error);
      });
    }
  });
};
MyPromise.race = function(promiseList){
  return new MyPromise((resolve,reject)=>{
    if(!Array.isArray(promiseList)){
      throw new Error('promiseList must be an array');
    }
    for(let i =0;i<promiseList.length;i++){
      MyPromise.resolve(promiseList[i]).then(resolve,reject);
    }
  })
}
MyPromise.any = function(promiseList){
  return new MyPromise((resolve,reject)=>{
    if(!Array.isArray(promiseList)){
      throw new Error('promiseList must be an array');
    }
    const num = promiseList.length;
    if(!num){
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }
    let rejectedNum = 0;
    const errors = [];
    for(let i=0;i<num;i++){
      MyPromise.resolve(promiseList[i])
      .then((res)=>{
        resolve(res);
      })
      .catch((err)=>{
        errors.push(err);
        rejectedNum++;
        if(rejectedNum === num){
          reject(new AggregateError(errors, 'All promises were rejected'));
        }
      })
    }
  })
};
MyPromise.allSettled = function(promiseList){
  return new MyPromise((resolve,reject)=>{
    if(!Array.isArray(promiseList)){
      throw new Error('not an array');
    }
    const num = promiseList.length;
    let settledNum = 0;
    const result = new Array(num);
    if(!num){
      resolve([]);
      return;
    }
    for(let i =0;i<num;i++){
      MyPromise.resolve(promiseList[i]).then((value)=>{
        result[i] = {
          status: 'fulfilled',
          value
        }
      })
      .catch(error=>{
        result[i] = {
          status: 'rejected',
          error
        }
      })
      .finally(()=>{
        settledNum++;
        if(settledNum === num){
          resolve(result);
        }
      })
    }
  })
}