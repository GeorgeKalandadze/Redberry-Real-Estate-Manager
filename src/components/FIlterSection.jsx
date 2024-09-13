import React, { useState, useEffect, useRef } from "react";
import ArrowDownIcon from "../assets/arrow-down.png";
import { useGlobalContext } from "../contexts/Context";

// Utility Component for Checkboxes
const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
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
              stroke={checked ? "white" : "#021526"}
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
};

const FilterInput = ({ value, placeholder, onChange, icon }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md"
        placeholder={placeholder}
      />
      {icon && (
        <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
          {icon}
        </span>
      )}
    </div>
  );
};

const StaticValueList = ({ values, onSelect }) => {
  return (
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
};

const FilterItem = React.forwardRef(
  (
    { label, children, isOpen, toggleOpen, applyFilters, closeFilterSection },
    ref
  ) => {
    return (
      <div ref={ref} className="px-2 relative text-left">
        <button
          onClick={toggleOpen}
          className={`flex gap-2 px-4 font-bold items-center py-2 rounded-md w-full transition-all
          ${isOpen ? "bg-gray-200" : "bg-white"} 
          hover:bg-gray-100`}
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
              onClick={() => {
                applyFilters();
              }}
            >
              არჩევა
            </button>
          </div>
        </div>
      </div>
    );
  }
);

const FilterSection = ({
  filters,
  setFilters,
  applyFilters,
  closeFilterSection,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Temporary filter state
  const [tempFilters, setTempFilters] = useState(filters);

  const dropdownRefs = useRef([]);
  const { regions } = useGlobalContext();

  const staticPrices = ["50,000", "100,000", "150,000", "200,000", "300,000"];
  const staticAreas = ["50,000", "100,000", "150,000", "200,000", "300,000"];

  // Sync tempFilters with the actual filters when filters are cleared
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]); // Whenever filters change, update tempFilters

  const handleTempFilterChange = (filterKey, value) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const handleRegionChange = (region) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      regions: prevFilters.regions.includes(region)
        ? prevFilters.regions.filter((r) => r !== region)
        : [...prevFilters.regions, region],
    }));
  };

  const applyTempFilters = () => {
    setFilters(tempFilters); 
    setOpenDropdown(null)
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="flex py-2 gap-4 rounded-lg border-[#DBDBDB] border">
      {/* Region Filter */}
      <FilterItem
        label="რეგიონი"
        isOpen={openDropdown === "location"}
        toggleOpen={() => toggleDropdown("location")}
        ref={(el) => (dropdownRefs.current["location"] = el)}
        applyFilters={applyTempFilters}
        closeFilterSection={closeFilterSection} // Pass the closeFilterSection handler
      >
        <div className="grid grid-cols-4 gap-8">
          {regions.map((region) => (
            <CustomCheckbox
              key={region.id}
              label={region.name}
              checked={tempFilters.regions.includes(region.name)}
              onChange={() => handleRegionChange(region.name)}
            />
          ))}
        </div>
      </FilterItem>

      {/* Price Filter */}
      <FilterItem
        label="ფასის მითითებით"
        isOpen={openDropdown === "price"}
        toggleOpen={() => toggleDropdown("price")}
        ref={(el) => (dropdownRefs.current["price"] = el)}
        applyFilters={applyTempFilters}
        closeFilterSection={closeFilterSection}
      >
        <div className="grid grid-cols-2 gap-4">
          <FilterInput
            value={tempFilters.price.from}
            placeholder="დან"
            onChange={(e) =>
              handleTempFilterChange("price", {
                ...tempFilters.price,
                from: e.target.value,
              })
            }
            icon="₾"
          />
          <FilterInput
            value={tempFilters.price.to}
            placeholder="მდე"
            onChange={(e) =>
              handleTempFilterChange("price", {
                ...tempFilters.price,
                to: e.target.value,
              })
            }
            icon="₾"
          />
        </div>

        {/* Static Price Values */}
        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-bold mb-3">მინ. ფასი</p>
            <StaticValueList
              values={staticPrices}
              onSelect={(value) =>
                handleTempFilterChange("price", {
                  ...tempFilters.price,
                  from: value,
                })
              }
            />
          </div>
          <div>
            <p className="font-bold mb-3">მაქს. ფასი</p>
            <StaticValueList
              values={staticPrices}
              onSelect={(value) =>
                handleTempFilterChange("price", {
                  ...tempFilters.price,
                  to: value,
                })
              }
            />
          </div>
        </div>
      </FilterItem>

      {/* Area Filter */}
      <FilterItem
        label="ფართობის მითითებით"
        isOpen={openDropdown === "area"}
        toggleOpen={() => toggleDropdown("area")}
        ref={(el) => (dropdownRefs.current["area"] = el)}
        applyFilters={applyTempFilters}
        closeFilterSection={closeFilterSection}
      >
        <div className="grid grid-cols-2 gap-4">
          <FilterInput
            value={tempFilters.area.from}
            placeholder="დან"
            onChange={(e) =>
              handleTempFilterChange("area", {
                ...tempFilters.area,
                from: e.target.value,
              })
            }
            icon="მ²"
          />
          <FilterInput
            value={tempFilters.area.to}
            placeholder="მდე"
            onChange={(e) =>
              handleTempFilterChange("area", {
                ...tempFilters.area,
                to: e.target.value,
              })
            }
            icon="მ²"
          />
        </div>

        {/* Static Area Values */}
        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-bold mb-3">დან. მ²</p>
            <StaticValueList
              values={staticAreas}
              onSelect={(value) =>
                handleTempFilterChange("area", {
                  ...tempFilters.area,
                  from: value,
                })
              }
            />
          </div>
          <div>
            <p className="font-bold mb-3">მდე. მ²</p>
            <StaticValueList
              values={staticAreas}
              onSelect={(value) =>
                handleTempFilterChange("area", {
                  ...tempFilters.area,
                  to: value,
                })
              }
            />
          </div>
        </div>
      </FilterItem>

      {/* Bedrooms Filter */}
      <FilterItem
        label="საძინებლების რაოდენობა"
        isOpen={openDropdown === "bedrooms"}
        toggleOpen={() => toggleDropdown("bedrooms")}
        ref={(el) => (dropdownRefs.current["bedrooms"] = el)}
        applyFilters={applyTempFilters}
      >
        <FilterInput
          value={tempFilters.bedrooms || ""} 
          placeholder="Enter number of bedrooms"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            handleTempFilterChange("bedrooms", isNaN(value) ? "" : value); 
          }}
        />
      </FilterItem>
    </div>
  );
};

export default FilterSection;
