export const setWeatherImage = (weather, time) => {
  switch (weather) {
    case 'Thunderstorm': {
      return './img/weather/thunder.svg'
    }
    case 'Drizzle': {
      return './img/weather/drizzle.svg'
    }
    case 'Rain': {
      return './img/weather/rain.svg'
    }
    case 'Snow': {
      return './img/weather/snow.svg'
    }
    case 'Clear': {
      if (time >= '18:00' || time <= '05:00') {
        return './img/weather/night.svg'
      } else {
        return './img/weather/day.svg'
      }
    }
    case 'Clouds': {
      if (time >= '18:00' || time <= '05:00') {
        return './img/weather/cloudy-night.svg'
      } else {
        return './img/weather/cloudy-day.svg'
      }
    }
    default: {
      return './img/weather/mist.svg'
    }
  }
}