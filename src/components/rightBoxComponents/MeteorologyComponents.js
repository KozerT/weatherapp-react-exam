import React from "react";

const MeteorologyComponents = ({ data }) => {
  const precipitation = data.rain?.["1h"] || data.snow?.["1h"] || 0;
  const precipitationPercent = (precipitation * 100).toFixed(0);
  const displayPrecipitation =
    precipitationPercent <= 100 ? `${precipitationPercent}%` : "100%";

  return (
    <div className="relative flex flex-col items-start w-full right_top meteo-text ">
      <div className="flex items-center justify-between marg-bot w-80 ">
        <p className="font-semibold">PRECIPITATION</p>
        <p className="font-normal ">{displayPrecipitation}</p>
      </div>
      <div className="flex items-center justify-between marg-bot w-80">
        <p className="font-semibold">HUMIDITY</p>
        <p className="font-normal ">{data.main.humidity}%</p>
      </div>
      <div className="flex items-center justify-between marg-bot w-80">
        <p className="font-semibold ">WIND</p>
        <p className="font-normal ">{Math.round(data.wind.speed)} km/h</p>
      </div>
    </div>
  );
};

export default MeteorologyComponents;
