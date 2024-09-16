import React from "react";
import ArrowDownIcon from "../../assets/arrow-down.png";

const FilterItem = React.forwardRef(
  ({ label, children, isOpen, toggleOpen, applyFilters }, ref) => (
    <div ref={ref} className=" relative text-left">
      <button
        onClick={toggleOpen}
        className={`flex gap-2 px-2 font-bold items-center py-2 rounded-md w-full transition-all ${
          isOpen ? "bg-gray-200 text-black" : "bg-white text-[#021526]"
        } hover:bg-gray-100`}
      >
        {label}
        <img
          src={ArrowDownIcon}
          alt="Arrow Down"
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`absolute mt-5 w-max bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 transition-all duration-300 transform origin-top ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        {children}
        <div className="flex justify-end mt-2">
          <button
            className="bg-[#F93B1D] max-w-max px-3 text-white w-full py-2 mt-4 rounded-lg hover:bg-red-600 transition"
            onClick={applyFilters}
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  )
);

export default FilterItem;
