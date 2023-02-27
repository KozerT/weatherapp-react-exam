import React, { useState, useEffect } from "react";
import { WEATHER_API_KEY } from "../Api";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import DayCard from "./DayCard";

const WeekInfo = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeatherData(data.list);
    };

    fetchWeatherData();
  }, [lat, lon]);

  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 4; i++) {
      days.push(dayjs().add(i, "day").format("YYYY-MM-DD"));
    }
    return days;
  };

  return (

    <div className="relative flex items-center justify-center card-wrap w-80 2xl:my-16 md:my-6 xl:my-14 ">
      <ul className="flex flex-row items-center w-full justify-evenly card-list">
        {getNextDays().map((date, index) => {
          const dayData = weatherData.find((item) =>
            item.dt_txt.includes(date)
          );
          const temperature = dayData && Math.round(dayData.main.temp);
          const weatherIcon = dayData && dayData.weather[0].icon;

          return (
            <DayCard
              key={index}
              location=""
              temperature={temperature}
              className="flex-col justify-center align-middle "
              weatherIcon={weatherIcon}
              date={date}
            />
          );
        })}
      </ul>
    </div>
  );
};

WeekInfo.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default WeekInfo;
