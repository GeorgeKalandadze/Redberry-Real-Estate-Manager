import React from "react";

const CustomCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center cursor-pointer space-x-2">
    <div
      onClick={onChange}
      className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-all ${
        checked ? "bg-green-500" : "border-2 border-gray-300"
      }`}
    >
      {checked && (
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1.40918L4.125 9.591L1 5.87199"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
    <span>{label}</span>
  </label>
);

export default CustomCheckbox;
