export const getClockHandsDegree =()=> {
      const date = new Date();
    const hour = date.getHours() % 12;
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const millisec = date.getMilliseconds();

    const HOUR_IN_MS = 60 * 60 * 1000
    const MINUTE_IN_MS = 60 * 1000
    const SECOND_IN_MS = 1000

    const nowInMs = hour * HOUR_IN_MS + minute * MINUTE_IN_MS + second * SECOND_IN_MS + millisec;

    return {
        hour:(nowInMs / (12 * HOUR_IN_MS)) * 2 * Math.PI,
        minute: ((nowInMs % (12 * HOUR_IN_MS)) / (60 * MINUTE_IN_MS)) * 2 * Math.PI,
        second:((nowInMs % (60 * MINUTE_IN_MS)) / (60 * SECOND_IN_MS)) * 2 * Math.PI
    }
}