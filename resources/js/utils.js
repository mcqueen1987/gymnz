export function getTimeStrMap(){
    let minMap = ['00', '15', '30', '45'];
    let timeStrMap = [];
    for (let i = 0; i < 96; i++) {
        let hour = Math.floor(i / 4);
        if (hour < 10) {
            hour = '0' + hour;
        }
        timeStrMap.push(hour + ':' + minMap[i % 4]);
    }
    return timeStrMap;
}
