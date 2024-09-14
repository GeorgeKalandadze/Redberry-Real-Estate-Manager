import React from "react";

const InputGroup = ({ label, type, hint, name, value, onChange, isValid }) => {
  const inputStyles = {
    transition: "border-color 0.5s ease, background-color 0.5s ease",
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-bold text-[14px]">{label}*</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyles}
        className={`w-full rounded-md border-[2px] py-2 px-2 outline-none
        ${
          isValid === "valid"
            ? "border-[#c3c2c8] "
            : isValid === "invalid"
            ? "border-[#F93B1D] "
            : "border-[#c3c2c8] "
        }`}
      />
      <div className="flex items-center gap-3 mt-1">
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            stroke:
              isValid === "valid"
                ? "#45A849"
                : isValid === "invalid"
                ? "#F93B1D"
                : "black",
          }}
        >
          <path
            d="M11 1.40918L4.125 9.591L1 5.87199"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          className={`font-medium text-[14px] ${
            isValid === "valid"
              ? "text-green-500"
              : isValid === "invalid"
              ? "text-red-500"
              : "text-[#021526]"
          }`}
        >
          {hint}
        </p>
      </div>
    </div>
  );
};

export default InputGroup;
