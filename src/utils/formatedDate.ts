const formatedDate = (date: Date) => {
    let dif = Math.abs(Number(new Date()) - Number(date));
    let hoursAgo = Math.trunc(dif / 3.6E6);
    let minutesAgo = Math.trunc(dif / 6E4);
    if (minutesAgo < 60) {
        return 'Há ' + String(minutesAgo) + ' minuto(s)';
    } else if (hoursAgo < 24) {
        return 'Há ' + String(hoursAgo) + 'h';
    } else {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
            ' às ' + date.getHours() + 'h' + ((date.getMinutes() >= 10) ? date.getMinutes() : '0' + date.getMinutes());
    }
}

export default formatedDate;