import "../App.css";
import React, { useState } from "react";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import LeftBoxItems from "./leftBoxComponents/LeftBox";
import MeteorologyComponents from "./rightBoxComponents/MeteorologyComponents";
import LocationSearch from "./locationSearch/changeLocation";
import { WEATHER_API_KEY } from "./Api";
import WeekInfo from "./rightBoxComponents/WeekInfo";

const HomeComponents = () => {
  const [meteorologyComponents, setMeteorologyComponents] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const MeteorologyComponentsFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([MeteorologyComponentsFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setMeteorologyComponents({
          city: searchData.label,
          ...weatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })

      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="app-wrapper">
        <div className="flex items-center w-1/2 sm:w-7/12 md:w-8/12 box-container ">
          <LeftBoxItems
            location={meteorologyComponents?.name ?? ""}
            temperature={meteorologyComponents?.main?.temp ?? ""}
            weatherDescription={
              meteorologyComponents?.weather[0]?.description ?? ""
            }
            weatherIcon={meteorologyComponents?.weather[0]?.icon ?? ""}
          />

          <div className="w-1/2 h-full auto-cols-max sm:w-7/12 md:w-8/12 right-box">
            <div className="flex flex-col w-full h-full ">
              {meteorologyComponents && (
                <MeteorologyComponents data={meteorologyComponents} />
              )}

              {forecast && (
                <WeekInfo
                  lat={meteorologyComponents?.coord?.lat}
                  lon={meteorologyComponents?.coord?.lon}
                />
              )}

              <div className="w-full right_bottom">
                <LocationSearch onSearchChange={handleOnSearchChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponents;
