function myNew(Constructor, ...args) {
    if (typeof Constructor !== 'function') {
        throw new TypeError('not a function')
    };
    const instance = Object.create(Constructor.prototype);
    const result = Constructor.apply(instance, args);
    
    const isReferenceType = (typeof result === 'object' && result !== null) || (typeof result === 'function');
    return isReferenceType ? result : instance;
}