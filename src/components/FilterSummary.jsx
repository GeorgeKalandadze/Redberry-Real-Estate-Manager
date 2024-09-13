import React from "react";
import ClearIcon from "../assets/clear-icon.png";
const FilterSummary = ({ filters, removeFilter, clearAllFilters }) => {
  const formatPrice = (from, to) => {
    if (!from && !to) return "";
    if (!from) return `0 ₾ - ${to} ₾`;
    if (!to) return `${from} ₾ +`;
    return `${from} ₾ - ${to} ₾`;
  };

  const formatArea = (from, to) => {
    if (!from && !to) return "";
    if (!from) return `0 მ² - ${to} მ²`;
    if (!to) return `${from} მ² +`;
    return `${from} მ² - ${to} მ²`;
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      {filters.regions.length > 0 &&
        filters.regions.map((region) => (
          <div
            key={region}
            className="inline-flex items-center px-[10px] py-[4px] border border-[#DBDBDB] rounded-full text-sm text-[#354451]"
          >
            {region}
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeFilter("regions", region)}
            >
              <img src={ClearIcon} alt="" />
            </button>
          </div>
        ))}

      {(filters.price.from || filters.price.to) && (
        <div className="inline-flex items-center px-[10px] py-[4px] border border-[#DBDBDB] rounded-full text-sm text-[#354451]">
          {formatPrice(filters.price.from, filters.price.to)}
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => removeFilter("price")}
          >
            <img src={ClearIcon} alt="" />
          </button>
        </div>
      )}

      {(filters.area.from || filters.area.to) && (
        <div className="inline-flex items-center px-[10px] py-[4px] border border-[#DBDBDB] rounded-full text-sm text-[#354451]">
          {formatArea(filters.area.from, filters.area.to)}
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => removeFilter("area")}
          >
            <img src={ClearIcon} alt="" />
          </button>
        </div>
      )}

      {filters.bedrooms && (
        <div className="inline-flex items-center px-[10px] py-[4px] border border-[#DBDBDB] rounded-full text-sm text-[#354451]">
          {filters.bedrooms} საძინებელი
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => removeFilter("bedrooms")}
          >
            <img src={ClearIcon} alt="" />
          </button>
        </div>
      )}

      <button
        className="ml-4 text-[17px] font-semibold"
        onClick={clearAllFilters}
      >
        გასუფთავება
      </button>
    </div>
  );
};

export default FilterSummary;
