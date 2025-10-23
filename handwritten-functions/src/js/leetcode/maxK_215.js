// 1. 分治
const divide = (arr, start, end) => {
    const pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++){
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
    return i + 1;
}
const quickSort = (arr,start,end,targetIndex) => {
    const index = divide(arr, start, end);
    if (index === targetIndex) {
        return arr[index];
    } else if (index < targetIndex) {
       return quickSort(arr, index + 1, end, targetIndex);
    } else {
       return quickSort(arr, start, index - 1, targetIndex);
    }
}
const maxK = (arr, k) => {
    const targetIndex = arr.length - k;
    return quickSort(arr, 0, arr.length - 1, targetIndex);
}
// 2. 大顶堆
const heapify = (arr, i, size) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < size && arr[largest] < arr[left]) {
        largest = left;
    }
    if (right < size && arr[largest] < arr[right]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[largest], arr[i]] = [arr[i], arr[largest]];
        heapify(arr, largest, size);
    }
}
const buildHeap = (arr, size) => {
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--){
        heapify(arr, i, size);
    }
}
const maxK2 = (arr, k) => {
    let size = arr.length;
    buildHeap(arr, size);
    for (let i = arr.length - 1; i > arr.length - k; i--){
        [arr[0], arr[i]] = [arr[i], arr[0]];
        size--;
        heapify(arr, 0, size);
    }
    return arr[0];
}