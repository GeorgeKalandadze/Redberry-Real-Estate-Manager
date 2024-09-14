import React from "react";

const StaticValueList = ({ values, onSelect }) => (
  <ul className="space-y-2">
    {values.map((value) => (
      <li
        key={value}
        className="cursor-pointer"
        onClick={() => onSelect(value)}
      >
        {value}
      </li>
    ))}
  </ul>
);

export default StaticValueList;
