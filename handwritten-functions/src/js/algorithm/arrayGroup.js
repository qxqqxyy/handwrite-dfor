const peoples = [
    {
        name: "Alice",
        age: 30,
        sex: "male",
        address: { provinces: "beijing", city: "beijing" },
    },
    {
        name: "Bob",
        age: 20,
        sex: "female",
        address: { provinces: "hubei" },
    },
    {
        name: "Charlie",
        age: 18,
        sex: "male",
        address: { provinces: "henan" },
    },
    {
        name: "Diana",
        age: 19,
        sex: "female",
        address: { provinces: "guangdong" },
    },
    {
        name: "Frank",
        age: 20,
        sex: "male",
        address: { provinces: "shanxi" },
    },
];
const groupBy = (arr, keys) => {
    if (keys.length === 0) return arr;
    const [firstKey, ...restKey] = keys;
    // age
    return arr.reduce((acc, cur) => {
        const keyValue = cur[firstKey];
        if (!acc[keyValue]) {
            acc[keyValue] = [];
        }
        acc[keyValue].push(cur);
        if (restKey.length) {
            groupBy(acc[keyValue], restKey);
        }
        return acc;
    }, {});
}
console.log(groupBy(peoples, ['age']))