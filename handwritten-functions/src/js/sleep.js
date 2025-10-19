function sleep(delay, value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, delay);
    });
};
async function demo() {
    const res = await sleep(3000,'test');
    console.log(res);
};
demo();
