import React, {useEffect, useState} from 'react';
import {weatherApi} from "../../Api/Api";
import {Link} from "react-router-dom";
import {setWeatherImage} from "../setWeatherImage";
import s from './Main.module.scss'
import Loader from "../loader";

const Main = () => {
    const [currentLocationData, setCurrentLocationData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      setLoading(true)
      navigator.geolocation.getCurrentPosition((data) => {
        try {
          weatherApi.byCoords(data.coords.latitude, data.coords.longitude)
            .then(res => {
              let ms = (res.data.dt) * 1000
              let date = new Date(ms)
              let {description, main} = res.data.weather[0]
              let {temp, feels_like} = res.data.main
              let {name} = res.data
              setCurrentLocationData({name, temp, feels_like, description, main, date})
              setLoading(false)
            })
        } catch (e) {
          console.log(e)
          alert('Возникла проблема. Лимит запросов на сервер на сегодня, видимо, исчерпан :(')
        }
      }, () => {
        alert('Мое супер приложение, к сожалению, не может работать без ваших геоданных. Разрешите мне ими воспользоваться плз')
      }, {enableHighAccuracy: true})
    }, [])
    return (
      <div className={s.App}>
        <header className={s.appHeader}>
          <div className={s.appWrapper}>
            <div className={s.appInner}>
              {loading ?
                <Loader/>
                :
                <>
                  <h1>{currentLocationData.name}</h1>
                  <div className={s.weatherCondition}>
                    <div className={s.temperature}>{Math.round(currentLocationData.temp)}<span>°C</span></div>
                    <img width={100} height={100}
                         src={setWeatherImage(currentLocationData.main, new Date(currentLocationData.date).toLocaleString('ru-RU', {
                           hour: "numeric",
                           minute: "numeric"
                         }))} alt="weather condition"/>
                  </div>
                  <div className={s.middle}>
                    <div className={s.description}>{currentLocationData.description}</div>
                    <div>Ощущается как {Math.round(currentLocationData.feels_like)}° C</div>
                  </div>
                  <Link to={'/daily'}>
                    <span>Погода на другие дни</span>
                  </Link>
                </>
              }
            </div>
          </div>
        </header>
      </div>
    );
  }
;

export default Main;