import React, { useState, useRef, useEffect } from "react";
import ArrowDownIcon from "../assets/arrow-down.png";
import { useGlobalContext } from "../contexts/Context";

const CustomSelect = ({
  label,
  options,
  placeholder,
  onChange,
  value,
  isValid,
}) => {
  const { setIsAgentModalOpen } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(
    value?.label || placeholder
  );

  useEffect(() => {
    if (value) {
      setSelectedValue(value.label);
    } else {
      setSelectedValue(placeholder);
    }
  }, [value, placeholder]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedValue(option.label);
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownStyles = {
    borderColor:
      isValid === "valid"
        ? "#c3c2c8"
        : isValid === "invalid"
        ? "#F93B1D"
        : "#c3c2c8",
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="font-bold text-[14px] text-[#1A1A1F]">{label}</label>
      <div
        className={`mt-1 border-[2px] px-3 py-2 flex justify-between items-center cursor-pointer transition-all duration-300 ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
        style={dropdownStyles}
        onClick={toggleDropdown}
      >
        <span>{selectedValue}</span>
        <img
          src={ArrowDownIcon}
          alt="Arrow Down"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`absolute bg-white border-2 border-t-0 border-[#c3c2c8] rounded-b-lg shadow-lg w-full z-10 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          maxHeight: isOpen ? "240px" : "0",
          opacity: isOpen ? "1" : "0",
        }}
      >
        <ul className="divide-y divide-gray-300">
          {placeholder === "აირჩიე აგენტი" && (
            <li
              className="px-4 py-2 text-black flex items-center gap-2 cursor-pointer"
              onClick={() => setIsAgentModalOpen(true)}
            >
              <span className="rounded-full border border-black w-5 h-5 flex items-center justify-center">
                +
              </span>
              დაამატე აგენტი
            </li>
          )}
          {options && options.length > 0
            ? options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))
            : placeholder !== "აირჩიე აგენტი" && (
                <div className="px-4 py-2 text-gray-500">
                  No options available.
                </div>
              )}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
