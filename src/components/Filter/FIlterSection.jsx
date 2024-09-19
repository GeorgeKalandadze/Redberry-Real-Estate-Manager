
import React, { useState, useEffect, useRef } from "react";

import { useGlobalContext } from "../../contexts/Context";
import CustomCheckbox from "./CustomCheckbox";
import FilterItem from "./FilterItem";
import FilterInput from "./FilterInput";
import StaticValueList from "./StaticValueList";

const FilterSection = () => {
  const { regions, filters, setFilters } = useGlobalContext();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [tempFilters, setTempFilters] = useState({
    price: { from: "", to: "" },
    area: { from: "", to: "" },
  });
  const [validationErrors, setValidationErrors] = useState({
    priceFromError: false,
    priceToError: false,
    areaFromError: false,
    areaToError: false,
  });
  const dropdownRefs = useRef([]);
  const [inputValues, setInputValues] = useState({
    price: { from: "", to: "" },
    area: { from: "", to: "" },
  });

  const staticPrices = ["50,000", "100,000", "150,000", "200,000", "300,000"];
  const staticAreas = ["50,000", "100,000", "150,000", "200,000", "300,000"];

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleTempFilterChange = (filterKey, value) => {
    const parsedValue = {
      from: value.from ? parseFloat(value.from.replace(/,/g, "")) : 0,
      to: value.to ? parseFloat(value.to.replace(/,/g, "")) : Infinity,
    };

    const newFilters = { ...tempFilters, [filterKey]: value };

    if (filterKey === "area") {
      const min = parsedValue.from || 0;
      const max = parsedValue.to || Infinity;
      setValidationErrors({
        ...validationErrors,
        areaFromError: min > max,
        areaToError: min > max,
      });
    }

    if (filterKey === "price") {
      const minPrice = parsedValue.from || 0;
      const maxPrice = parsedValue.to || Infinity;
      setValidationErrors({
        ...validationErrors,
        priceFromError: minPrice > maxPrice,
        priceToError: minPrice > maxPrice,
      });
    }

    setTempFilters(newFilters);
  };

  const validateFilters = () => {
    return !(
      validationErrors.priceFromError ||
      validationErrors.priceToError ||
      validationErrors.areaFromError ||
      validationErrors.areaToError
    );
  };

  const applyTempFilters = (currentTarget) => {
    const isPriceDropdownOpen = dropdownRefs.current["price"]?.contains(
      document.activeElement
    );
    const isAreaDropdownOpen = dropdownRefs.current["area"]?.contains(
      document.activeElement
    );

    if (
      (isPriceDropdownOpen &&
        (validationErrors.priceFromError || validationErrors.priceToError)) ||
      (isAreaDropdownOpen &&
        (validationErrors.areaFromError || validationErrors.areaToError))
    ) {
      return;
    }

    const newFilters = { ...filters };

    console.log(tempFilters);
    
    if (currentTarget) {
      newFilters[currentTarget] = validateFilterValues(
        tempFilters[currentTarget],
        currentTarget
      );
    }
    setValidationErrors({})
    setFilters(newFilters);
    setOpenDropdown(null);
  };

  const validateFilterValues = (values, filterType) => {
    let validatedValues = values;

    if (filterType === "price") {
      const parsedPrice = {
        from: values.from ? parseFloat(values.from.replace(/,/g, "")) : 0,
        to: values.to ? parseFloat(values.to.replace(/,/g, "")) : Infinity,
      };
      if (parsedPrice.from <= parsedPrice.to) {
        validatedValues = values;
      } else {
        validatedValues = { from: "", to: "" };
      }
    }

    if (filterType === "area") {
      const parsedArea = {
        from: values.from ? parseFloat(values.from.replace(/,/g, "")) : 0,
        to: values.to ? parseFloat(values.to.replace(/,/g, "")) : Infinity,
      };
      if (parsedArea.from <= parsedArea.to) {
        validatedValues = values;
      } else {
        validatedValues = { from: "", to: "" };
      }
    }

    return validatedValues;
  };

  const handleRegionChange = (region) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      regions: prevFilters.regions.includes(region)
        ? prevFilters.regions.filter((r) => r !== region)
        : [...prevFilters.regions, region],
    }));
  };

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
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
    <div className="flex px-2 py-2 gap-4 rounded-lg border-[#DBDBDB] border justify-between">
      <FilterItem
        label="რეგიონი"
        isOpen={openDropdown === "location"}
        toggleOpen={() => toggleDropdown("location")}
        ref={(el) => (dropdownRefs.current["location"] = el)}
        applyFilters={() => applyTempFilters("regions")}
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {regions.map((region) => (
            <CustomCheckbox
              key={region.id}
              label={region.name}
              checked={tempFilters?.regions?.includes(region.name)}
              onChange={() => handleRegionChange(region.name)}
            />
          ))}
        </div>
      </FilterItem>

      <FilterItem
        label="ფასის მითითებით"
        isOpen={openDropdown === "price"}
        toggleOpen={() => toggleDropdown("price")}
        ref={(el) => (dropdownRefs.current["price"] = el)}
        applyFilters={() => applyTempFilters("price")}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <FilterInput
              value={tempFilters.price.from?.toLocaleString() || ""}
              placeholder="დან"
              onChange={(e) =>
                handleTempFilterChange("price", {
                  ...tempFilters.price,
                  from: e.target.value.replace(/,/g, ""),
                })
              }
              icon="₾"
              hasError={validationErrors.priceFromError}
            />
            <FilterInput
              value={tempFilters.price.to?.toLocaleString() || ""}
              placeholder="მდე"
              onChange={(e) =>
                handleTempFilterChange("price", {
                  ...tempFilters.price,
                  to: e.target.value.replace(/,/g, ""),
                })
              }
              icon="₾"
              hasError={validationErrors.priceToError}
            />
          </div>

          {(validationErrors.priceFromError ||
            validationErrors.priceToError) && (
            <p className=" min-w-max text-red-500 text-sm mt-1">
              ჩაწერეთ ვალიდური მონაცემები
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-bold mb-3">მინ. ფასი</p>
            <StaticValueList
              values={staticPrices}
              onSelect={(value) =>
                handleTempFilterChange("price", {
                  ...tempFilters.price,
                  from: value.replace(/,/g, ""),
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
                  to: value.replace(/,/g, ""),
                })
              }
            />
          </div>
        </div>
      </FilterItem>

      <FilterItem
        label="ფართობის მითითებით"
        isOpen={openDropdown === "area"}
        toggleOpen={() => toggleDropdown("area")}
        ref={(el) => (dropdownRefs.current["area"] = el)}
        applyFilters={() => applyTempFilters("area")}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <FilterInput
              value={tempFilters.area.from?.toLocaleString() || ""}
              placeholder="დან"
              onChange={(e) =>
                handleTempFilterChange("area", {
                  ...tempFilters.area,
                  from: e.target.value.replace(/,/g, ""),
                })
              }
              icon="მ²"
              hasError={validationErrors.areaFromError}
            />
            <FilterInput
              value={tempFilters.area.to?.toLocaleString() || ""}
              placeholder="მდე"
              onChange={(e) =>
                handleTempFilterChange("area", {
                  ...tempFilters.area,
                  to: e.target.value.replace(/,/g, ""),
                })
              }
              icon="მ²"
              hasError={validationErrors.areaToError}
            />
          </div>
          {(validationErrors.areaFromError || validationErrors.areaToError) && (
            <p className=" text-red-500 text-sm mt-1">
              ჩაწერეთ ვალიდური მონაცემები
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-bold mb-3">დან. მ²</p>
            <StaticValueList
              values={staticAreas}
              onSelect={(value) =>
                handleTempFilterChange("area", {
                  ...tempFilters.area,
                  from: value.replace(/,/g, ""),
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
                  to: value.replace(/,/g, ""),
                })
              }
            />
          </div>
        </div>
      </FilterItem>

      <FilterItem
        label="საძინებლების რაოდენობა"
        isOpen={openDropdown === "bedrooms"}
        toggleOpen={() => toggleDropdown("bedrooms")}
        ref={(el) => (dropdownRefs.current["bedrooms"] = el)}
        applyFilters={() => applyTempFilters("bedrooms")}
      >
        <FilterInput
          value={tempFilters.bedrooms || ""}
          placeholder="ოთახები"
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


