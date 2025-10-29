const compare = (str1, str2) => {
    const arr1 = str1.split('.');
    const arr2 = str2.split('.');
    const length = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < length; i++){
        const cur1 = Number(arr1[i] || 0);
        const cur2 = Number(arr2[i] || 0);
        if (cur1 > cur2) {
            return 1
        } else if (cur1 < cur2) {
            return -1
        }
    }
    return 0;
}
const compareVersionList = (versionList) => versionList.sort((a, b) => compare(a, b));
const test = ['1.2', '1.25', '1.45', '1.5', '2'];
console.log(compareVersionList(test));