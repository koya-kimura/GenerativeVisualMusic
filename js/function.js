function truncateArray(arr, num) {
    if (!Array.isArray(arr) || typeof num !== 'number') {
        throw new Error('Invalid arguments');
    }
    return arr.slice(0, num);
}

function clamp(value, minNum, maxNum) {
    return max(min(value, maxNum), minNum);
}

function newnoise(seed1=0, seed2=0, seed3=0) {
    return clamp(map(noise(seed1, seed2, seed3), 0, 1, -0.3, 1.3), 0, 1);
}

function formatNumber(num) {
    // 数値が整数かどうかをチェック
    if (Number.isInteger(num)) {
        return num.toFixed(2);
    } else {
        // 少数の場合は小数点第2位まで表示
        return parseFloat(num).toFixed(2);
    }
}

function oscillate(t) {
    const v = pow(sin(t * PI), 2);
    return clamp(abs(1-v), 0, 1);
}