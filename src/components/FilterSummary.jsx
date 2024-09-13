import React from "react";

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
    <div className=" items-center mb-4">
      {filters.regions.length > 0 &&
        filters.regions.map((region) => (
          <div
            key={region}
            className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
          >
            {region}
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeFilter("regions", region)}
            >
              ✕
            </button>
          </div>
        ))}

      {(filters.price.from || filters.price.to) && (
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
          {formatPrice(filters.price.from, filters.price.to)}
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => removeFilter("price")}
          >
            ✕
          </button>
        </div>
      )}

      {(filters.area.from || filters.area.to) && (
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
          {formatArea(filters.area.from, filters.area.to)}
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => removeFilter("area")}
          >
            ✕
          </button>
        </div>
      )}

      {filters.bedrooms && (
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
          {filters.bedrooms} საძინებელი
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => removeFilter("bedrooms")}
          >
            ✕
          </button>
        </div>
      )}

      <button
        className="ml-auto text-red-500 hover:text-red-700 font-semibold"
        onClick={clearAllFilters}
      >
        ყველა ფილტრის გასუფთავება
      </button>
    </div>
  );
};

export default FilterSummary;
