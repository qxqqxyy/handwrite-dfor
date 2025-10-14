function myCreate(proto, propertiesObject) {
    
    if (typeof proto !== 'object' && typeof proto !== 'function' && proto !== null) {
        throw new TypeError('Object prototype may only be an Object or null');
    }
    let newObj;
    if (proto === null) {
        newObj = {};
        Object.setPrototypeOf(newObj, null);
    } else {
        function TmpCunstructor() { };
        TmpCunstructor.prototype = proto;
        newObj = new TmpCunstructor();
    }

    if (propertiesObject!==undefined) {
        Object.defineProperties(newObj, propertiesObject);
    }
    return newObj;
}