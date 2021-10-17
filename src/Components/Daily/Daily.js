import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import WeekWeather from "./WeekWeather/WeekWeather";
import {weatherApi} from "../../Api/Api";
import s from './Daily.module.scss'
import Loader from "../loader";


const Daily = () => {
  const [loading, setLoading] = useState(true)
  const [dailyWeather, setDailyWeather] = useState([])
  useEffect(() => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(async data => {
      try {
        const res = await weatherApi.forWeek(data.coords.latitude, data.coords.longitude)
        setDailyWeather({list: res.data.list, city: res.data.city})
        setLoading(false)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }, (error) => {
      alert('Plz turn on the browser geolocation bro')
    }, {enableHighAccuracy: true})
  }, [])

  return (
    <div className={s.App}>
      <div className={s.appHeader}>
        {loading ? <Loader/> :
          <>
            <Link to={'../'}>
              <img src="./img/content/arrow.svg" alt="Go ."/>
              <span>Back</span>
            </Link>
            <div>
              <WeekWeather city={dailyWeather.city} list={dailyWeather.list}/>
            </div>
          </>}
      </div>
    </div>
  );
};

export default Daily;