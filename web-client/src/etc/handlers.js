export function calcCubeAge(date) {
    return Math.round((Date.now() - new Date(date)) / 86400000);
}

export function validateDay(n) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
        return "дней";
    }
    if (n1 > 1 && n1 < 5) {
        return "дня";
    }
    if (n1 === 1) {
        return "день";
    }
    return "дней";
}
