import React from "react";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {A11y, Navigation, Scrollbar} from 'swiper'
import {FooterContent, FooterItem, FooterItemDivider, FooterItemTemp, FooterItemTime} from "./FooterSwiperStyles";
import {setWeatherImage} from "../../Utils/setWeatherImage";

SwiperCore.use([Navigation, A11y, Scrollbar])

export const DailyForecast = ({days}) => {
    return (<FooterContent>
        <div className="next-button">
            <img src="./img/content/swiper-next.svg" alt="next"/>
        </div>
        <div className="prev-button">
            <img src="./img/content/swiper-prev.svg" alt="prev"/>
        </div>
        <Swiper
            slidesPerView={11}
            modules={[Navigation, Scrollbar, A11y]}
            navigation={{
                nextEl: '.next-button', prevEl: '.prev-button',
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                }, 480: {
                    slidesPerView: 2,
                }, 640: {
                    slidesPerView: 3,
                }, 768: {
                    slidesPerView: 4,
                }, 1024: {
                    slidesPerView: 6,
                }, 1196: {
                    slidesPerView: 7,
                }, 1440: {
                    slidesPerView: 11,
                }
            }}
        >
            {days.map(e => {
                let hours = new Date(e.dt_txt).getHours()
                const minutes = new Date(e.dt_txt).getMinutes() + "0"
                if (hours < 10) hours = "0" + hours
                let time = `${hours}:${minutes}`

                if (new Date().getDay() !== new Date(e.dt_txt).getDay()) {
                    const weekday = new Date(e.dt_txt).toLocaleString("ru-RU", {weekday: "short"})
                    time = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}. ${time}`
                }

                let temp = Math.round(e.main.temp)
                if (temp > 0) temp = "+" + temp

                const imageUri = setWeatherImage(e.weather[0].main, new Date(e.dt_txt).toLocaleString('ru-RU', {
                    hour: "numeric", minute: "numeric"
                }))
                return (

                    <SwiperSlide key={e.dt_txt}>
                        {time.includes("00:00") ? <FooterItemDivider/> : null}
                        <FooterItem>
                            <FooterItemTime>{time}</FooterItemTime>
                            <img height={25} src={imageUri} alt="condition"/>
                            <FooterItemTemp>{temp}<span>°C</span></FooterItemTemp>
                        </FooterItem>
                    </SwiperSlide>)
            })}
        </Swiper>
    </FooterContent>)
}