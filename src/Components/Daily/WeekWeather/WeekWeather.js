import React, {useEffect, useState} from 'react';
import s from './WeekWeather.module.scss'
import OneDayWeather from "./OneDayWeather/OneDayWeather";


const WeekWeather = ({city, list}) => {
  const [dayName, setDayName] = useState([])
  const unixToHourAndMin = (time) => {
    let ms = time * 1000
    return new Date(ms).toLocaleString("ru-RU", {hour: "numeric", minute: "numeric"})
  }
  const unixToWeekday = (time, dayName) => {
    let day = new Date(time.dt_txt).toLocaleString("ru-RU", {weekday: "long"}).toLowerCase()
    return day === dayName
  }
  const days = (arr) => {
    return arr.map((e) => {
      let day = new Date(e.dt_txt).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric"
      })
      return {
        day,
        temp: Math.round(e.main.temp),
        feels_like: Math.round(e.main.feels_like),
        description: e.weather[0].description,
        date: e.dt_txt,
        main: e.weather[0].main

      }
    })
  }
  useEffect(() => {
    let week = [
      {day: 'понедельник', data: days(list.filter((day) => unixToWeekday(day, 'понедельник')))},
      {day: 'вторник', data: days(list.filter((day) => unixToWeekday(day, 'вторник')))},
      {day: 'среда', data: days(list.filter((day) => unixToWeekday(day, 'среда')))},
      {day: 'четверг', data: days(list.filter((day) => unixToWeekday(day, 'четверг')))},
      {day: 'пятница', data: days(list.filter((day) => unixToWeekday(day, 'пятница')))},
      {day: 'суббота', data: days(list.filter((day) => unixToWeekday(day, 'суббота')))},
      {day: 'воскресенье', data: days(list.filter((day) => unixToWeekday(day, 'воскресенье')))},
    ].sort((a, b) => {
      if (a.data.length === 0 || b.data.length === 0) {
        return 0
      }
      if (a.data[0].day < b.data[0].day) {
        return 1
      } else if (a.data[0].day > b.data[0].day) {
        return -1
      }
    }).reverse().filter(el => el.data.length !== 0)
    setDayName(week)
  }, [])

  return (
    <div className={s.App}>
      <div className={s.header}>
        <h1>{city.name}</h1>
      </div>
      <hr/>
      {dayName.length > 0 ?
        <div className={s.forecastWrapper}>
          {dayName.map(e => <OneDayWeather dayName={e}/>)}
        </div>
        : <></>}
    </div>
  );
};

export default WeekWeather;