class EventEmit{
    constructor(){
        this.events = {};
    }
    on(event, cb) { 
        if (!this.events[event]) {
            this.events[event] = [cb];
        } else {
            this.events[event].push(cb);
        }
    }
    once(event,cb) {
        const fn = (...args) => {
            cb(...args);
            this.off(event, fn);
        };
        this.on(event, fn);
    }
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(cb => {
                cb(...args);
            });
        }
     }
    off(event,cb) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(item => item !== cb);
        }
    }
}
const events = new EventEmit();
const func = str => console.log(str);
events.on('say', func);
events.emit('say', 'hello');
events.off('say', func);
console.log(events);