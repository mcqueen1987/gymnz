export const TimeStrMap = getTimeStrMap();

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
};

export function getTimeStr(i){
    return TimeStrMap[i];
};

export function getTimeRange(start, end, step = 1){
    let ret = [];
    for(let i = start; i<end; i += step ) {
        ret.push(TimeStrMap[i]);
    }
    return ret;
}

export function range(start, end, step = 1){
    let ret = [];
    for(let i = start; i<end; i += step ) {
        ret.push(i);
    }
    return ret;
}