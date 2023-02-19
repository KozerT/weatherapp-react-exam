import "../../App.css";
import React, { useState, useEffect } from "react";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import { UilLocationPoint } from "@iconscout/react-unicons";
import Today from "./Date";
import {
  WiDaySunny,
  WiCloudy,
  WiDayRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const LeftBoxItems = ({
  location,
  temperature,
  weatherDescription,
  weatherIcon,
}) => {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    if (weatherIcon) {
      switch (weatherIcon) {
        case "01d":
        case "01n":
          setIcon(<WiDaySunny size={95} />);
          break;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setIcon(<WiCloudy size={95} />);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setIcon(<WiDayRain size={95} />);
          break;
        case "11d":
        case "11n":
          setIcon(<WiThunderstorm size={95} />);
          break;
        case "13d":
        case "13n":
          setIcon(<WiSnow size={95} />);
          break;
        default:
          setIcon(<WiDaySunny size={95} />);
          break;
      }
    }
  }, [weatherIcon]);

  return (
    <div className="w-1/2 h-full left-box">
      <div className="flex flex-col items-start left_top">
        <div className="flex items-center current-date-location">
          <Today />
        </div>
        <div className="flex mt-2 text-sm font-medium location">
          <UilLocationPoint
            size={27}
            className="mt-1 transition ease-out hover:scale-125 "
          />
          <p className="mx-1 mt-2 lg:text-base">{location}</p>
        </div>
      </div>
      <div className="flex flex-col items-start left_bottom ">
        <div className="mb-1 -mx-2 lg:mb-0">{icon} </div>
        <p className="text-4xl font-bold ">{Math.round(temperature)} °C</p>
        <p className="mt-3 text-2xl font-semibold ">
          {weatherDescription.charAt(0).toUpperCase() +
            weatherDescription.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default LeftBoxItems;
