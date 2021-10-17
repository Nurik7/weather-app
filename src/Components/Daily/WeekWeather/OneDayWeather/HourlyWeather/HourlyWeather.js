import React from 'react';

import s from "./HourlyWeather.module.scss";
import {setWeatherImage} from "../../../../setWeatherImage";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.scss'
import {Swiper, SwiperSlide} from "swiper/react";

import SwiperCore, {A11y, Navigation, Scrollbar} from 'swiper'

SwiperCore.use([Navigation, A11y, Scrollbar])


const HourlyWeather = ({data}) => {
  return (
    <div className={s.hourlyWeather}>
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Scrollbar, A11y]}
        navigation={data.length > 1 ? true : false}
        scrollbar={{draggable: true}}
      >
        {data.map(e => (

            <SwiperSlide>
              {({isActive}) => (
                <div>Current slide is {isActive ? 'active' : 'not active'}</div>
              )}
              <div className={s.hourlyCard}>
                <div className={s.date}>{e.day}</div>
                <div className={s.degrees}>
                  <div>{e.temp}<span>°C</span></div>
                  <img src={setWeatherImage(e.main, new Date(e.date).toLocaleString('ru-RU', {
                    hour: "numeric",
                    minute: "numeric"
                  }))} alt=""/>
                </div>
                <div className={s.weatherCondition}>
                  <div>{e.description ? e.description : 'no detail'}</div>
                </div>
                <div className={s.feelsLike}>Ощущается как <span>{e.feels_like}° C</span></div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default HourlyWeather;