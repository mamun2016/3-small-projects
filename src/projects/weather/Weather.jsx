import React, { useState, useEffect } from 'react'
import "./weather.scss";
import { BsFillCloudSunFill } from "react-icons/bs";
import { WiHumidity, WiDayFog, WiNightFog } from "react-icons/wi";
import { MdCompress, MdOutlineEditCalendar } from "react-icons/md";
import { GiWhirlwind, GiSmokeBomb, GiRaining, GiSunset } from "react-icons/gi";
import { BsFillCloudHazeFill, BsSnow2, BsCloudLightningRainFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Dhaka");
  const [tempInfo, setTempInfo] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const {
    temp,
    humidity,
    pressure,
    city,
    weatherMood,
    country,
    sunset,
    speed
  } = tempInfo;

  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=dee778a1c2e235ae95842b6ecfb8d993`;
      const res = await fetch(url);
      const data = await res.json();
      
      const { temp, humidity, pressure } = data.main;
      const { name: city } = data;
      const { main: weatherMood } = data.weather[0];
      const { country, sunset } = data.sys;
      const { speed } = data.wind;

      const NewWeatherInfo = {
        temp,
        humidity,
        pressure,
        city,
        weatherMood,
        country,
        sunset,
        speed
      };

      setTempInfo(NewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }

// API call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  useEffect(() => {
    getWeatherInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(weatherMood) {
      switch(weatherMood) {
        case "Clouds":
          setWeatherIcon(<BsFillCloudSunFill />);
          break;

        case "Haze":
          setWeatherIcon(<BsFillCloudHazeFill />);
          break;

        case "Clear":
          setWeatherIcon(<IoSunnySharp />);
          break;
        
        case "Smoke":
          setWeatherIcon(<GiSmokeBomb />);
          break;

        case "Mist":
          setWeatherIcon(<WiDayFog />);
          break;

        case "Snow":
          setWeatherIcon(<BsSnow2 />);
          break;

        case "Fog":
          setWeatherIcon(<WiNightFog />);
          break;

        case "Drizzle":
          setWeatherIcon(<GiRaining />);
          break;

        case "Rain":
          setWeatherIcon(<BsCloudLightningRainFill />);
          break;

        default:
          setWeatherIcon(<IoSunnySharp />);
          break;
      }
    }
  }, [weatherMood])

  return (
    <div className="weather-holder">
      <h2 className="weather-title">Weather Report</h2>

      <div className="weather-search">
        <input type="text" 
          value={searchValue} 
          onChange={(e) =>  setSearchValue(e.target.value)} 
          autoFocus 
          className="weather-search-field" 
          placeholder="Search by City" 
        />

        <button onClick={getWeatherInfo} className="weather-search-button">Search</button>
      </div>

      <div className="weather-box">
        <div className="weather-icon">
          {weatherIcon}
        </div>

        <div className="weather-details">
          <div className="weather-condition">
            <div className="weather-temp">{temp}&deg;</div>
            <div className="weather-sky">{weatherMood}</div>
            <div className="weather-city">{city}, <strong>{country}</strong></div>
          </div>

          <div className="weather-date">
          <span><MdOutlineEditCalendar /></span>
            {new Date().toLocaleString()}
          </div>
        </div>

        <div className="weather-extras">
          <div className="weather-extras-details">
            <span><GiSunset /></span>
            
            <div className="weather-extras-text">
              <h4 className="weather-extras-title">Sunset</h4>
              <div className="weather-extras-value">{timeStr}</div>
            </div>
          </div>

          <div className="weather-extras-details">
            <span><WiHumidity /></span>
            
            <div className="weather-extras-text">
              <h4 className="weather-extras-title">Humidity</h4>
              <div className="weather-extras-value">{humidity}%</div>
            </div>
          </div>

          <div className="weather-extras-details">
            <small><MdCompress /></small>

            <div className="weather-extras-text">
              <h4 className="weather-extras-title">Pressure</h4>
              <div className="weather-extras-value">{pressure} MM</div>
            </div> 
          </div>

          <div className="weather-extras-details">
            <small><GiWhirlwind /></small>
            
            <div className="weather-extras-text">
              <h4 className="weather-extras-title">Wind</h4>
              <div className="weather-extras-value">{speed} kmph</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;
