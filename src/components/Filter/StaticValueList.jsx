import React from "react";

const StaticValueList = ({ values, onSelect, icon }) => (
  <ul className="space-y-2">
    {values.map((value) => (
      <li
        key={value}
        className="cursor-pointer flex gap-3"
        onClick={() => onSelect(value)}
      >
        {value} {icon}
      </li>
    ))}
  </ul>
);

export default StaticValueList;
