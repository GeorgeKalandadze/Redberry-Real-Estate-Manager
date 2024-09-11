import React, { useState, useEffect, useRef } from "react";
import ArrowDownIcon from "../assets/arrow-down.png";

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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-4 h-4"
          >
            <path d="M20.285 6.055l-11.43 11.43-4.285-4.285 1.43-1.43 2.855 2.855 10-10z" />
          </svg>
        )}
      </div>
      <span>{label}</span>
    </label>
  );
};

// Utility Component for Input with icon (₾ or m²)
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

// Utility Component for Static Value List
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

// Reusable Filter Dropdown
const FilterItem = React.forwardRef(
  ({ label, children, isOpen, toggleOpen }, ref) => {
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
              onClick={() => console.log("Applied filter")}
            >
              არჩევა
            </button>
          </div>
        </div>
      </div>
    );
  }
);

const FilterSection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    regions: [],
    bedrooms: "",
    price: { from: "", to: "" },
    area: { from: "", to: "" },
  });

  // Refs for outside click detection
  const dropdownRefs = useRef([]);

  const regions = [
    "თბილისი",
    "ბათუმი",
    "ქუთაისი",
    "გურია",
    "კახეთი",
    "რაჭა",
    "სამეგრელო",
    "სამცხე-ჯავახეთი",
  ];

  const staticPrices = [
    "50,000 ₾",
    "100,000 ₾",
    "150,000 ₾",
    "200,000 ₾",
    "300,000 ₾",
  ];
  const staticAreas = [
    "50,000 მ²",
    "100,000 მ²",
    "150,000 მ²",
    "200,000 მ²",
    "300,000 მ²",
  ];

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const handleRegionChange = (region) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      regions: prevFilters.regions.includes(region)
        ? prevFilters.regions.filter((r) => r !== region)
        : [...prevFilters.regions, region],
    }));
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
      >
        <div className="grid grid-cols-4 gap-8">
          {regions.map((region) => (
            <CustomCheckbox
              key={region}
              label={region}
              checked={filters.regions.includes(region)}
              onChange={() => handleRegionChange(region)}
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
      >
        <div className="grid grid-cols-2 gap-4">
          <FilterInput
            value={filters.price.from}
            placeholder="დან"
            onChange={(e) =>
              handleFilterChange("price", {
                ...filters.price,
                from: e.target.value,
              })
            }
            icon="₾"
          />
          <FilterInput
            value={filters.price.to}
            placeholder="მდე"
            onChange={(e) =>
              handleFilterChange("price", {
                ...filters.price,
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
                handleFilterChange("price", { ...filters.price, from: value })
              }
            />
          </div>
          <div>
            <p className="font-bold mb-3">მაქს. ფასი</p>
            <StaticValueList
              values={staticPrices}
              onSelect={(value) =>
                handleFilterChange("price", { ...filters.price, to: value })
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
      >
        <div className="grid grid-cols-2 gap-4">
          <FilterInput
            value={filters.area.from}
            placeholder="დან"
            onChange={(e) =>
              handleFilterChange("area", {
                ...filters.area,
                from: e.target.value,
              })
            }
            icon="მ²"
          />
          <FilterInput
            value={filters.area.to}
            placeholder="მდე"
            onChange={(e) =>
              handleFilterChange("area", {
                ...filters.area,
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
                handleFilterChange("area", { ...filters.area, from: value })
              }
            />
          </div>
          <div>
            <p className="font-bold mb-3">მდე. მ²</p>
            <StaticValueList
              values={staticAreas}
              onSelect={(value) =>
                handleFilterChange("area", { ...filters.area, to: value })
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
      >
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5].map((bedroom) => (
            <button
              key={bedroom}
              onClick={() => handleFilterChange("bedrooms", bedroom)}
              className={`w-10 h-10 border rounded-md flex items-center justify-center text-lg font-semibold ${
                filters.bedrooms === bedroom
                  ? "bg-gray-200 border-black"
                  : "bg-white"
              }`}
            >
              {bedroom}
            </button>
          ))}
        </div>
      </FilterItem>
    </div>
  );
};

export default FilterSection;
