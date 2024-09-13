import React, { useState, useEffect } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import Card from "../../components/Card";
import FilterSection from "../../components/FilterSection";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/Context";
import { useSessionStorage } from "../../hooks/useSessionStorage"; // Import the hook
import FilterSummary from "../../components/FilterSummary";

const Home = () => {
  const { setIsAgentModalOpen, realEstateList } = useGlobalContext();

  // Use session storage for filters
  const [filters, setFilters] = useSessionStorage("realEstateFilters", {
    regions: [],
    bedrooms: "",
    price: { from: "", to: "" },
    area: { from: "", to: "" },
  });

  const [filteredRealEstateList, setFilteredRealEstateList] =
    useState(realEstateList);

  // Apply the filters to the real estate list
  useEffect(() => {
    const filtered = realEstateList.filter((property) => {
      const matchRegion =
        filters.regions.length === 0 ||
        filters.regions.includes(property.city.region.name);
      const matchBedrooms =
        !filters.bedrooms || property.bedrooms === Number(filters.bedrooms);
      const matchPrice =
        (!filters.price.from || property.price >= Number(filters.price.from)) &&
        (!filters.price.to || property.price <= Number(filters.price.to));
      const matchArea =
        (!filters.area.from || property.area >= Number(filters.area.from)) &&
        (!filters.area.to || property.area <= Number(filters.area.to));

      return matchRegion && matchBedrooms && matchPrice && matchArea;
    });

    setFilteredRealEstateList(filtered);
  }, [filters, realEstateList]);


  const handleRemoveFilter = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "regions") {
        return {
          ...prevFilters,
          regions: prevFilters.regions.filter((region) => region !== value),
        };
      } else {
        return {
          ...prevFilters,
          [filterType]:
            filterType === "price" || filterType === "area"
              ? { from: "", to: "" }
              : "",
        };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      regions: [],
      bedrooms: "",
      price: { from: "", to: "" },
      area: { from: "", to: "" },
    });
  };
  
  return (
    <GuestLayout>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <FilterSection filters={filters} setFilters={setFilters} />
          <div className="flex items-center gap-4">
            <Link
              to="/create-listing"
              className="bg-[#F93B1D] text-white text-[16px] font-medium px-6 py-4 rounded-xl"
            >
              + ლისტინგის დამატება
            </Link>
            <button
              onClick={() => setIsAgentModalOpen(true)}
              className="text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-6 py-4 rounded-xl"
            >
              + აგენტის დამატება
            </button>
          </div>
        </div>
        <FilterSummary
          filters={filters}
          removeFilter={handleRemoveFilter}
          clearAllFilters={clearAllFilters}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRealEstateList.length > 0 ? (
            filteredRealEstateList.map((property) => (
              <Link to={`listing/${property.id}`} key={property.id}>
                <Card
                  image={property.image}
                  price={property.price}
                  address={property.address}
                  beds={property.bedrooms}
                  area={property.area}
                  mailIndex={property.zip_code}
                  label={property.label}
                  isRental={property.is_rental}
                />
              </Link>
            ))
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </div>
    </GuestLayout>
  );
};

export default Home;
