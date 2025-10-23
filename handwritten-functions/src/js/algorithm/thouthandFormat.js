function convert(money) {
    // 边界处理
    // 科学技术法的情况补充todo
    if (money == null || isNaN(money)) {
        return '';
    }
    const str = money.toString();

    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}