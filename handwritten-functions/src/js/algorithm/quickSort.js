const divide = (arr, start, end) => {
    const pivot = arr[start];
    let i = start + 1;
    let j = end;
    while (i <= j) {
        if (arr[i] < pivot) {
            i++;
        } else if (arr[j] > pivot) {
            j--;
        } else {
            [arr[i++], arr[j--]] = [arr[i], arr[j]];
        }
    }
    [arr[start],arr[i-1]]=[arr[i-1],arr[start]];
    return i - 1;
}
const quickSort = (arr,start,end) => {
    if (start < end) {
        const pivot = divide(arr, start, end);
        quickSort(arr, start, pivot-1);
        quickSort(arr, pivot + 1, end);
    }
    return arr;
}