export const days = (arr) => {
    return arr.map((e) => {
        let day = new Date(e.dt_txt).toLocaleString("ru-RU", {
            day: "numeric", month: "long", hour: "numeric", minute: "numeric"
        })
        return {
            day,
            temp: Math.round(e.main.temp),
            feels_like: Math.round(e.main.feels_like),
            description: e.weather[0].description.charAt(0).toUpperCase() + e.weather[0].description.slice(1),
            date: e.dt_txt,
            main: e.weather[0].main

        }
    })
}

export const unixToWeekday = (time, dayName) => {
    let day = new Date(time.dt_txt).toLocaleString("ru-RU", {weekday: "long"}).toLowerCase()
    return day === dayName
}