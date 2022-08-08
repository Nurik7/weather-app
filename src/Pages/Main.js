import React, {useEffect, useState} from 'react';
import {weatherApi} from "../Api/Api";
import {setWeatherImage} from "../Utils/setWeatherImage";
import Loader from "../Components/Loader/loader";
import {
    ChangeCityButton,
    CityName,
    Container,
    Content,
    ContentAdditional,
    ContentDesc,
    ContentTemp,
    CurrentTime,
    Header,
    HeaderBottom,
    HeaderTop,
    LoaderWrapper,
    MyLocationButton,
    SelectCityButton,
    Wrapper
} from "./MainStyles";

import {CountriesDropdown} from "../Components/CountriesDropdown/CountriesDropdown";
import {DailyForecast} from "../Components/FooterSwiper/FooterSwiper";
import {Footer} from "../Components/FooterSwiper/FooterSwiperStyles";
import {unixToWeekday, days} from "../Helpers/DaysHelper";


export const Main = () => {
    // let interval
    const [inter, setInter] = useState(0)
    const [currentLocationData, setCurrentLocationData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSelectedCity, setIsSelectedCity] = useState(true)
    const [currentTime, setCurrentTime] = useState("")
    const [dailyWeather, setDailyWeather] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCityTimezone, setSelectedCityTimezone] = useState(0)
    const [selectedCity, setSelectedCity] = useState(false)

    const calcTime = (offset) => {
        setSelectedCityTimezone(offset)
        setSelectedCity(true)
        console.log("nibba")
        let interval = setInterval(() => {
            let normalTimezoneOffset = offset / 60 / 60
            // create Date object for current location
            const d = new Date();

            // convert to msec
            // subtract local time zone offset
            // get UTC time in msec
            const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            const nd = new Date(utc + (3600000 * normalTimezoneOffset));
            window.clearInterval(inter)
            setInter(0)
            // setCurrentTime(nd)

            let hours = nd.getHours()
            let minutes = nd.getMinutes()
            if (hours < 10) hours = "0" + hours
            if (minutes < 10) minutes = "0" + minutes
            let currentTime = `${hours}:${minutes}`
            setCurrentTime(currentTime)
        }, 1000)
        setInter(interval)
    }

    const handleCountrySelect = async (city, countryCode) => {
        setIsLoading(true)
        try {
            const weeklyRes = await weatherApi.certainCity(city, countryCode)
            setDailyWeather({list: weeklyRes.data.list, city: weeklyRes.data.city})

            const locationRes = await weatherApi.byCoords(weeklyRes.data.city.coord.lat, weeklyRes.data.city.coord.lon)
            let ms = (locationRes.data.dt) * 1000
            let date = new Date(ms)
            let {description, main} = locationRes.data.weather[0]
            let {temp, feels_like, humidity, pressure} = locationRes.data.main
            let {name, timezone} = locationRes.data
            let {speed} = locationRes.data.wind
            setSelectedCityTimezone(timezone)
            calcTime(timezone)
            temp = Math.round(temp)
            description = description.charAt(0).toUpperCase() + description.slice(1)
            if (temp > 0) {
                temp = "+" + temp
            }
            setCurrentLocationData({
                name, temp, feels_like, description, main, date, humidity, pressure, speed
            })
            setIsSelectedCity(true)
        } catch (e) {
            console.log("ooops")
            setIsSelectedCity(false)
        }
        setIsLoading(false)
    }

    const fetchUserGeolocation = () => {
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(async (data) => {
            setIsSelectedCity(true)
            try {
                const locationRes = await weatherApi.byCoords(data.coords.latitude, data.coords.longitude)
                let ms = (locationRes.data.dt) * 1000
                let date = new Date(ms)
                let {description, main} = locationRes.data.weather[0]
                let {temp, feels_like, humidity, pressure} = locationRes.data.main
                let {name} = locationRes.data
                let {speed} = locationRes.data.wind
                temp = Math.round(temp)
                description = description.charAt(0).toUpperCase() + description.slice(1)
                if (temp > 0) {
                    temp = "+" + temp
                }
                setCurrentLocationData({
                    name, temp, feels_like, description, main, date, humidity, pressure, speed
                })

                const weeklyRes = await weatherApi.forWeek(data.coords.latitude, data.coords.longitude)

                setDailyWeather({list: weeklyRes.data.list, city: weeklyRes.data.city})
                setIsLoading(false)
            } catch (e) {
                alert('Возникла проблема. Лимит запросов на сервер на сегодня, видимо, исчерпан :(')
            }
        }, () => {
            setIsSelectedCity(false)
            setIsLoading(false)
            alert('Мое супер приложение, к сожалению, не может работать без ваших геоданных. Разрешите мне ими воспользоваться плз')
        }, {enableHighAccuracy: true})
    }

    useEffect(() => {
        const d = new Date()
        let hours = d.getHours()
        let minutes = d.getMinutes()
        if (hours < 10) hours = "0" + hours
        if (minutes < 10) minutes = "0" + minutes
        let currentTime = `${hours}:${minutes}`
        setCurrentTime(currentTime)
        let interval = setInterval(() => {
            console.log(selectedCity.toString())
            console.log(interval)
            if (selectedCity) return
            const d = new Date()
            let hours = d.getHours()
            let minutes = d.getMinutes()
            if (hours < 10) hours = "0" + hours
            if (minutes < 10) minutes = "0" + minutes
            let currentTime = `${hours}:${minutes}`
            setCurrentTime(currentTime)
        }, 1000)
        setInter(interval)
        fetchUserGeolocation()

        return () => {
            console.log("return useEffect")
            window.clearInterval(inter)
            setInter(0)
        }
    }, [])


    return (<Wrapper>{isLoading ? <LoaderWrapper>
        <Loader/>
    </LoaderWrapper> : <>
        <Header>
            <Container>
                <HeaderTop isSelectedCity={isSelectedCity}>
                    {isSelectedCity ? <CityName>{currentLocationData.name}</CityName> :
                        <SelectCityButton onClick={() => setIsModalOpen(true)}>Выбрать город</SelectCityButton>}
                    <CurrentTime>Сейчас {currentTime}</CurrentTime>
                </HeaderTop>
                <HeaderBottom>
                    <ChangeCityButton onClick={() => setIsModalOpen(true)}>Сменить город</ChangeCityButton>
                    <MyLocationButton onClick={fetchUserGeolocation}>
                        <img src="./img/content/my_location.svg" alt="navigator"/>
                        Мое местоположение
                    </MyLocationButton>
                </HeaderBottom>
            </Container>
        </Header>
        <Content>
            <Container>{isSelectedCity ? <>
                <ContentTemp>
                    <img width={140} height={140}
                         src={setWeatherImage(currentLocationData.main, new Date(currentLocationData.date).toLocaleString('ru-RU', {
                             hour: "numeric", minute: "numeric"
                         }))} alt="weather condition"/>
                    <span>{currentLocationData.temp}<span>°</span></span>
                </ContentTemp>
                <ContentDesc>
                    {currentLocationData.description}
                </ContentDesc>
                <ContentAdditional>
                    <div>
                        <img src="./img/content/wind.svg" alt="wind"/>
                        <span>{currentLocationData.speed} м/с</span>
                    </div>
                    <div>
                        <img src="./img/content/humidity.svg" alt="humidity"/>
                        <span>{currentLocationData.humidity}%</span>
                    </div>
                    <div>
                        <img src="./img/content/pressure.svg" alt="pressure"/>
                        <span>{currentLocationData.pressure} мм.рт.ст</span>
                    </div>
                </ContentAdditional></> : <></>}
            </Container>
        </Content>
        <Footer isModalOpen={isModalOpen}>
            <Container>
                {isSelectedCity ? <DailyForecast days={dailyWeather.list}/> : <></>}
            </Container>
        </Footer>
        <CountriesDropdown closeModal={() => setIsModalOpen(false)} isModalOpen={isModalOpen}
                           handleSelectCountry={handleCountrySelect}/>
    </>}
    </Wrapper>);
};