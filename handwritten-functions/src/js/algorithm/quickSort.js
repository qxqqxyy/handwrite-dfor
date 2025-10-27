const divide = (arr, start, end) => {
    const pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i += 1;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
    return i + 1;
}
const quickSort = (arr,start = 0,end = arr.length -1) => {
    if (start < end) {
        const pivot = divide(arr, start, end);
        quickSort(arr, start, pivot-1);
        quickSort(arr, pivot + 1, end);
    }
    return arr;
}
const arr = [1, 8, 4, 2, 5];
console.log(quickSort(arr));