const maxSubString = (s) => {
    const set = new Set();
    let left = 0;
    let maxLen = 1;
    let start = 0;
    for (let right = 0; right < s.length; right++){
        const cur = s[right];
        while (set.has(cur)) {
            set.delete(s[left]);
            left++;
        }
        set.add(cur);
        if ((right - left + 1) > maxLen) {
            maxLen = right - left + 1;
            start = left;
        }
    }
    return s.substring(left, left + maxLen);
}
console.log(maxSubString('a    bc'));