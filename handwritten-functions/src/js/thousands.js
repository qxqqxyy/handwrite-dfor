// 千分位分割
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const number = 1234;
console.log(formatNumber(number));