// import React, { useState, useEffect, useRef } from "react";
// import ArrowDownIcon from "../assets/arrow-down.png";
// import { useGlobalContext } from "../contexts/Context";

// const CustomCheckbox = ({ label, checked, onChange }) => (
//   <label className="flex items-center cursor-pointer space-x-2">
//     <div
//       onClick={onChange}
//       className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-all ${
//         checked ? "bg-green-500" : "border-2 border-gray-300"
//       }`}
//     >
//       {checked && (
//         <svg
//           width="12"
//           height="11"
//           viewBox="0 0 12 11"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M11 1.40918L4.125 9.591L1 5.87199"
//             stroke={checked ? "white" : "#021526"}
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       )}
//     </div>
//     <span>{label}</span>
//   </label>
// );

// const FilterInput = ({ value, placeholder, onChange, icon, hasError }) => {
//   return (
//     <div className="relative">
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         className={`w-full px-3 py-2 outline-none pr-8 border ${
//           hasError ? "border-red-500" : "border-gray-300"
//         } rounded-md`}
//         placeholder={placeholder}
//       />
//       {icon && (
//         <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
//           {icon}
//         </span>
//       )}
//     </div>
//   );
// };

// const StaticValueList = ({ values, onSelect }) => (
//   <ul className="space-y-2">
//     {values.map((value) => (
//       <li
//         key={value}
//         className="cursor-pointer"
//         onClick={() => onSelect(value)}
//       >
//         {value}
//       </li>
//     ))}
//   </ul>
// );

// const FilterItem = React.forwardRef(
//   ({ label, children, isOpen, toggleOpen, applyFilters }, ref) => (
//     <div ref={ref} className="px-2 relative text-left">
//       <button
//         onClick={toggleOpen}
//         className={`flex gap-2 px-4 font-bold items-center py-2 rounded-md w-full transition-all ${
//           isOpen ? "bg-gray-200 text-black" : "bg-white text-[#021526]"
//         } hover:bg-gray-100`}
//       >
//         {label}
//         <img
//           src={ArrowDownIcon}
//           alt="Arrow Down"
//           className={`transition-transform transform ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//         />
//       </button>

//       <div
//         className={`absolute mt-5 w-max bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 transition-all duration-300 transform origin-top ${
//           isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
//         }`}
//         style={{ transformOrigin: "top" }}
//       >
//         {children}
//         <div className="flex justify-end mt-2">
//           <button
//             className="bg-[#F93B1D] max-w-max px-3 text-white w-full py-2 mt-4 rounded-lg hover:bg-red-600 transition"
//             onClick={applyFilters}
//           >
//             არჩევა
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// );

// const FilterSection = ({ filters, setFilters, closeFilterSection }) => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [tempFilters, setTempFilters] = useState(filters);
//   const [validationErrors, setValidationErrors] = useState({
//     priceFromError: false,
//     priceToError: false,
//     areaFromError: false,
//     areaToError: false,
//   });
//   const dropdownRefs = useRef([]);
//   const { regions } = useGlobalContext();

//   const staticPrices = ["50,000", "100,000", "150,000", "200,000", "300,000"];
//   const staticAreas = ["50", "100", "150", "200", "300"];

//   useEffect(() => {
//     setTempFilters(filters);
//   }, [filters]);

//   const handleTempFilterChange = (filterKey, value) => {
//     const newFilters = { ...tempFilters, [filterKey]: value };

//     if (filterKey === "area") {
//       const min = parseFloat(newFilters.area.from || 0);
//       const max = parseFloat(newFilters.area.to || Infinity);
//       setValidationErrors({
//         ...validationErrors,
//         areaFromError: min > max,
//         areaToError: min > max,
//       });
//     }

//     if (filterKey === "price") {
//       const minPrice = parseFloat(newFilters.price.from || 0);
//       const maxPrice = parseFloat(newFilters.price.to || Infinity);
//       setValidationErrors({
//         ...validationErrors,
//         priceFromError: minPrice > maxPrice,
//         priceToError: minPrice > maxPrice,
//       });
//     }

//     setTempFilters(newFilters);
//   };

//   const handleRegionChange = (region) => {
//     setTempFilters((prevFilters) => ({
//       ...prevFilters,
//       regions: prevFilters.regions.includes(region)
//         ? prevFilters.regions.filter((r) => r !== region)
//         : [...prevFilters.regions, region],
//     }));
//   };

//   const applyTempFilters = () => {
//     if (
//       validationErrors.priceFromError ||
//       validationErrors.priceToError ||
//       validationErrors.areaFromError ||
//       validationErrors.areaToError
//     ) {
//       return;
//     }

//     setFilters(tempFilters);
//     setOpenDropdown(null);
//   };

//   const toggleDropdown = (dropdownName) => {
//     if (openDropdown === dropdownName) {
//       setOpenDropdown(null);
//     } else {
//       setOpenDropdown(dropdownName);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         openDropdown &&
//         dropdownRefs.current[openDropdown] &&
//         !dropdownRefs.current[openDropdown].contains(event.target)
//       ) {
//         setOpenDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openDropdown]);

//   return (
//     <div className="flex py-2 gap-4 rounded-lg border-[#DBDBDB] border">
//       <FilterItem
//         label="რეგიონი"
//         isOpen={openDropdown === "location"}
//         toggleOpen={() => toggleDropdown("location")}
//         ref={(el) => (dropdownRefs.current["location"] = el)}
//         applyFilters={applyTempFilters}
//         closeFilterSection={closeFilterSection}
//       >
//         <div className="grid grid-cols-3 gap-8">
//           {regions.map((region) => (
//             <CustomCheckbox
//               key={region.id}
//               label={region.name}
//               checked={tempFilters.regions.includes(region.name)}
//               onChange={() => handleRegionChange(region.name)}
//             />
//           ))}
//         </div>
//       </FilterItem>

//       <FilterItem
//         label="ფასის მითითებით"
//         isOpen={openDropdown === "price"}
//         toggleOpen={() => toggleDropdown("price")}
//         ref={(el) => (dropdownRefs.current["price"] = el)}
//         applyFilters={applyTempFilters}
//         closeFilterSection={closeFilterSection}
//       >
//         <div className="grid grid-cols-2 gap-4">
//           <FilterInput
//             value={tempFilters.price.from}
//             placeholder="დან"
//             onChange={(e) =>
//               handleTempFilterChange("price", {
//                 ...tempFilters.price,
//                 from: e.target.value,
//               })
//             }
//             icon="₾"
//             hasError={validationErrors.priceFromError}
//           />
//           <FilterInput
//             value={tempFilters.price.to}
//             placeholder="მდე"
//             onChange={(e) =>
//               handleTempFilterChange("price", {
//                 ...tempFilters.price,
//                 to: e.target.value,
//               })
//             }
//             icon="₾"
//             hasError={validationErrors.priceToError}
//           />
//           {(validationErrors.priceFromError ||
//             validationErrors.priceToError) && (
//             <p className="text-red-500 text-sm mt-1">
//               ჩაწერეთ ვალიდური მონაცემები
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-8 mt-4">
//           <div>
//             <p className="font-bold mb-3">მინ. ფასი</p>
//             <StaticValueList
//               values={staticPrices}
//               onSelect={(value) =>
//                 handleTempFilterChange("price", {
//                   ...tempFilters.price,
//                   from: value,
//                 })
//               }
//             />
//           </div>
//           <div>
//             <p className="font-bold mb-3">მაქს. ფასი</p>
//             <StaticValueList
//               values={staticPrices}
//               onSelect={(value) =>
//                 handleTempFilterChange("price", {
//                   ...tempFilters.price,
//                   to: value,
//                 })
//               }
//             />
//           </div>
//         </div>
//       </FilterItem>

//       <FilterItem
//         label="ფართობის მითითებით"
//         isOpen={openDropdown === "area"}
//         toggleOpen={() => toggleDropdown("area")}
//         ref={(el) => (dropdownRefs.current["area"] = el)}
//         applyFilters={applyTempFilters}
//         closeFilterSection={closeFilterSection}
//       >
//         <div className="grid grid-cols-2 gap-4">
//           <FilterInput
//             value={tempFilters.area.from}
//             placeholder="დან"
//             onChange={(e) =>
//               handleTempFilterChange("area", {
//                 ...tempFilters.area,
//                 from: e.target.value,
//               })
//             }
//             icon="მ²"
//             hasError={validationErrors.areaFromError}
//           />
//           <FilterInput
//             value={tempFilters.area.to}
//             placeholder="მდე"
//             onChange={(e) =>
//               handleTempFilterChange("area", {
//                 ...tempFilters.area,
//                 to: e.target.value,
//               })
//             }
//             icon="მ²"
//             hasError={validationErrors.areaToError}
//           />
//           {(validationErrors.areaFromError || validationErrors.areaToError) && (
//             <p className="text-red-500 text-sm mt-1">
//               ჩაწერეთ ვალიდური მონაცემები
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-8 mt-4">
//           <div>
//             <p className="font-bold mb-3">დან. მ²</p>
//             <StaticValueList
//               values={staticAreas}
//               onSelect={(value) =>
//                 handleTempFilterChange("area", {
//                   ...tempFilters.area,
//                   from: value,
//                 })
//               }
//             />
//           </div>
//           <div>
//             <p className="font-bold mb-3">მდე. მ²</p>
//             <StaticValueList
//               values={staticAreas}
//               onSelect={(value) =>
//                 handleTempFilterChange("area", {
//                   ...tempFilters.area,
//                   to: value,
//                 })
//               }
//             />
//           </div>
//         </div>
//       </FilterItem>

//       <FilterItem
//         label="საძინებლების რაოდენობა"
//         isOpen={openDropdown === "bedrooms"}
//         toggleOpen={() => toggleDropdown("bedrooms")}
//         ref={(el) => (dropdownRefs.current["bedrooms"] = el)}
//         applyFilters={applyTempFilters}
//       >
//         <FilterInput
//           value={tempFilters.bedrooms || ""}
//           placeholder="ოთახების რაოდენობა"
//           onChange={(e) => {
//             const value = parseInt(e.target.value, 10);
//             handleTempFilterChange("bedrooms", isNaN(value) ? "" : value);
//           }}
//         />
//       </FilterItem>
//     </div>
//   );
// };

// export default FilterSection;


import React, { useState, useEffect, useRef } from "react";

import { useGlobalContext } from "../../contexts/Context";
import CustomCheckbox from "./CustomCheckbox";
import FilterItem from "./FilterItem";
import FilterInput from "./FilterInput";
import StaticValueList from "./StaticValueList";

const FilterSection = () => {
  const { regions, filters, setFilters } = useGlobalContext();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [tempFilters, setTempFilters] = useState(filters);
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

  // const handleTempFilterChange = (filterKey, value) => {
  //   // Parse values to numbers
  //   const parsedValue = {
  //     from: value.from ? parseFloat(value.from.replace(/,/g, "")) : 0,
  //     to: value.to ? parseFloat(value.to.replace(/,/g, "")) : Infinity,
  //   };

  //   // Initialize error flags
  //   let newErrors = { ...validationErrors };

  //   // Validate based on filter key
  //   if (filterKey === "area") {
  //     const min = parsedValue.from;
  //     const max = parsedValue.to;
  //     if (min > max) {
  //       newErrors.areaFromError = true;
  //       newErrors.areaToError = true;
  //     } else {
  //       newErrors.areaFromError = false;
  //       newErrors.areaToError = false;
  //     }
  //   }

  //   if (filterKey === "price") {
  //     const minPrice = parsedValue.from;
  //     const maxPrice = parsedValue.to;
  //     if (minPrice > maxPrice) {
  //       newErrors.priceFromError = true;
  //       newErrors.priceToError = true;
  //     } else {
  //       newErrors.priceFromError = false;
  //       newErrors.priceToError = false;
  //     }
  //   }

  //   // Update validation errors state
  //   setValidationErrors(newErrors);

  //   // Always update the temporary filters with current input values
  //   setTempFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [filterKey]: value,
  //   }));
  // };


  const handleRegionChange = (region) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      regions: prevFilters.regions.includes(region)
        ? prevFilters.regions.filter((r) => r !== region)
        : [...prevFilters.regions, region],
    }));
  };

  const applyTempFilters = () => {
    const isPriceDropdownOpen = dropdownRefs.current["price"]?.contains(
      document.activeElement
    );
    const isAreaDropdownOpen = dropdownRefs.current["area"]?.contains(
      document.activeElement
    );

    if (
      isPriceDropdownOpen &&
      (validationErrors.priceFromError || validationErrors.priceToError)
    ) {
      return;
    }

    if (
      isAreaDropdownOpen &&
      (validationErrors.areaFromError || validationErrors.areaToError)
    ) {
      return;
    }

    setFilters(tempFilters);
    setOpenDropdown(null);
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
    <div className="flex px-2 py-2 gap-4 rounded-lg border-[#DBDBDB] border">
      <FilterItem
        label="რეგიონი"
        isOpen={openDropdown === "location"}
        toggleOpen={() => toggleDropdown("location")}
        ref={(el) => (dropdownRefs.current["location"] = el)}
        applyFilters={applyTempFilters}
      >
        <div className="grid grid-cols-3 gap-8">
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

      <FilterItem
        label="ფასის მითითებით"
        isOpen={openDropdown === "price"}
        toggleOpen={() => toggleDropdown("price")}
        ref={(el) => (dropdownRefs.current["price"] = el)}
        applyFilters={applyTempFilters}
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
        applyFilters={applyTempFilters}
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
        applyFilters={applyTempFilters}
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


