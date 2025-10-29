const getPrime = (() => { 
    let currentNum = 2;
    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num == 2) return true;
        if (num % 2 === 0) return false;
        const sqrtNum = Math.sqrt(num);
        for (let i = 3; i <= sqrtNum; i += 2){
            if (num % i === 0) return false;
        }
        return true;
    }
    return ()=> {
        while (!isPrime(currentNum)) {
            currentNum += 1;
        }
        const nextNum = currentNum;
        console.log(nextNum);
        currentNum += 1;
        return nextNum;
    }
})();
getPrime();
getPrime();