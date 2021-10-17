import React from 'react';
import HourlyWeather from "./HourlyWeather/HourlyWeather";
import s from './OneDayWeather.module.scss'

const OneDayWeather = ({dayName}) => {
  const weekday = (day) => {
    let today = new Date()
    const yesterday = () => {
      let yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday.toLocaleString('ru-RU', {weekday: "long"})
    }
    const tomorrow = () => {
      let yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() + 1)
      return yesterday.toLocaleString('ru-RU', {weekday: "long"})
    }
    if (day === today.toLocaleString('ru-RU', {weekday: "long"})) {
      return 'сегодня'
    } else if (day === yesterday()) {
      return 'вчера'
    } else if (day === tomorrow()) {
      return 'завтра'
    }
    return day
  }
  return (
    <div>
      <div>
        <h1 className={s.weekdayName}>{weekday(dayName.day)}</h1>
        <div>
          <HourlyWeather data={dayName.data}/>
        </div>
      </div>
    </div>
  );
};

export default OneDayWeather;