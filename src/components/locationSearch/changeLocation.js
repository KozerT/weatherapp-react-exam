import React, { useState, useEffect } from "react";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../Api";

const LocationSearch = ({ onSearchChange, ...otherProps }) => {
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    fetch(`${GEO_API_URL}/cities?q=Stockholm`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.data && response.data.length) {
          const city = response.data[0];
          setSearch({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          });
          onSearchChange({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [otherProps.units, otherProps.setUnits]);

  const handleSearchClick = () => {
    setShowInput(!showInput);
  };

  const loadOptions = (inputValue) => {
    const minPopulation = 10000;
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=${minPopulation}&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setTimeout(() => {
      setShowInput(false);
    }, 1000);
  };

  return (
    <div className="flex ">
      <div className="flex flex-row items-center justify-center space-x-2 location-bottom w-80">
        <UilLocationPoint
          size={33}
          className="text-white transition ease-out cursor-pointer hover:scale-125"
          onClick={handleSearchClick}
        />
        {showInput ? (
          <AsyncPaginate
            placeholder="Please write your city ..."
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            className="async-paginate, w-80"
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "8px",
                fontSize: "15px",
                color: "black",
              }),

              menu: (provided, state) => ({
                ...provided,
                color: "#272E37",
                fontSize: "15px",
                borderColor: "transparent",
              }),

              indicatorsContainer: (provided, state) => ({
                ...provided,
                display: "none",
              }),

              menuList: (provided, state) => ({
                ...provided,
                maxHeight: "78px", 
              }),
            }}
          />
        ) : (
          <p className="font-normal text-white lg:text-xl">Change Location</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
