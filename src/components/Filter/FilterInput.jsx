import React from "react";

const FilterInput = ({ value, placeholder, onChange, icon, hasError }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`w-[180px] px-3 py-2 outline-none pr-8 border ${
        hasError ? "border-red-500" : "border-gray-300"
      } rounded-md`}
      placeholder={placeholder}
    />
    {icon && (
      <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
        {icon}
      </span>
    )}
  </div>
);

export default FilterInput;
