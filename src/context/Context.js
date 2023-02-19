
import React, { useContext, useEffect, useState } from "react";
import { WEATHER_API_KEY, GEO_API_URL, geoApiOptions } from '../components/Api';
import axios from "axios";

const WeatherContext = React.createContext();

const WeatherProvider = ({ children}) => {
  const [city, setCity] = useState({ });
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) {
        return;
      }
      try {
        const { latitude, longitude } = location;
        const currentResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`);
        const currentData = currentResponse.data;

        const dailyResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`);
        const dailyData = dailyResponse.data;


        setCity({
          city: location.name,
          lat: location.latitude,
          lng: location.longitude,
          country: location.countryCode,
          iso2: location.countryCode,
        });
        setCurrent(currentData);
        setDaily(dailyData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [location]);

  const onSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");
    const name = searchData.label.split(",")[0];
    const countryCode = searchData.label.split(",")[1];
    setLocation({ latitude, longitude, name, countryCode });
  };
      

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        current,
        setCurrent,
        daily,
        setDaily,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);


export { WeatherProvider, useWeather };
