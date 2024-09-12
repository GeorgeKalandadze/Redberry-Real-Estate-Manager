import React, { useState, useRef, useEffect } from "react";
import ArrowDownIcon from "../assets/arrow-down.png"; // Custom arrow icon

const CustomSelect = ({ label, options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || placeholder);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedValue(option);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="font-bold text-[14px] text-[#1A1A1F]">
        {label}
      </label>
      <div
        className={`mt-1 border-2 ${
          isOpen
            ? "border-[#c3c2c8] rounded-t-lg"
            : "border-[#c3c2c8] rounded-lg"
        } px-3 py-2 flex justify-between items-center cursor-pointer transition-all duration-300`}
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
        <ul className="divide-y divide-gray-300 ">
          <li
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
            onClick={() => handleOptionClick("add")}
          >
            <span className="text-lg mr-2 rounded-full border border-black flex items-center justify-center w-4 h-4">
              +
            </span>{" "}
            დაამატე დამატებითი
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4  py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;

