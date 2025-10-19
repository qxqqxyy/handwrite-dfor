class Scheduler{
    constructor(limit){
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    };
    add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                task,
                resolve,
                reject
            });
            this.run();
        })
    };
    run() {
        if (this.running >= this.limit || !this.queue.length) {
            return;
        }
        this.running += 1;
        // FIFO
        const { task, resolve, reject } = this.queue.shift();
        task().then((result) => {
            resolve(result);
        }).catch(error =>
            reject(error)
        ).finally(() => {
            this.running--;
            this.run();
        })
    }
}