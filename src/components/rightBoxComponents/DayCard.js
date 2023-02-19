import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  WiDaySunny,
  WiCloudy,
  WiDayRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import dayjs from "dayjs";

const DayCard = ({
  location,
  temperature,
  className,
  onClick,
  weatherIcon,
  date,
}) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (weatherIcon) {
      switch (weatherIcon) {
        case "01d":
        case "01n":
          setIcon(<WiDaySunny size={60} />);
          break;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setIcon(<WiCloudy size={60} />);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setIcon(<WiDayRain size={60} />);
          break;
        case "11d":
        case "11n":
          setIcon(<WiThunderstorm size={60} />);
          break;
        case "13d":
        case "13n":
          setIcon(<WiSnow size={60} />);
          break;
        default:
          setIcon(<WiDaySunny size={60} />);
          break;
      }
    }
  }, [weatherIcon]);

  const dayName = dayjs(date).format("ddd");

  return (
    <>
      <li className={`${className} flex justify-center`} onClick={onClick}>
        <div className="-ml-2">{icon}</div>
        <span className="font-light">{dayName}</span>
        <span className="block mt-2 font-semibold day-temp">
          {Math.round(temperature)} °C
        </span>
      </li>
    </>
  );
};

DayCard.propTypes = {
  location: PropTypes.string.isRequired,
  temperature: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  weatherIcon: PropTypes.string,
  date: PropTypes.string.isRequired,
};

DayCard.defaultProps = {
  className: "",
  onClick: () => {},
  weatherIcon: null,
};

export default DayCard;
