import axios from "axios";

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/'
})

export const weatherApi = {
  byCoords(lat, lon) {
    return instance.get(`weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=cf10b6eda7817e86696f8e4106d14a27`)
  },
  forWeek(lat, lon) {
    return instance.get(`forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=cf10b6eda7817e86696f8e4106d14a27`)
  },
  daily(lat, lon) {
    return instance.get(`forecast/daily?lat=${lat}&lon=${lon}&units=metric&lang=ru&cnt=5&appid=cf10b6eda7817e86696f8e4106d14a27`)
  },
  certainCity(cityName, countryCode) {
    return instance.get(`forecast?q=${cityName},${countryCode}&units=metric&lang=ru&appid=cf10b6eda7817e86696f8e4106d14a27`)
  }
}