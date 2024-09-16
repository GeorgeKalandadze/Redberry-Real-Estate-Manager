import React, { useState, useEffect } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/Context";
import { useSessionStorage } from "../../hooks/useSessionStorage"; 
import FilterSummary from "../../components/FilterSummary";
import FilterSection from "../../components/Filter/FIlterSection";

const Home = () => {
  const { setIsAgentModalOpen, realEstateList, setFilters, filters } =
    useGlobalContext();

  const [filteredRealEstateList, setFilteredRealEstateList] =
    useState(realEstateList);

  useEffect(() => {
    const filteredRealEstateList = realEstateList.filter((property) => {
      const noFiltersApplied =
        filters.regions.length === 0 &&
        !filters.bedrooms &&
        !filters.price.from &&
        !filters.price.to &&
        !filters.area.from &&
        !filters.area.to;

      if (noFiltersApplied) {
        return true;
      }

      let matchesAtLeastOneFilter = false;

      if (filters.regions.length > 0) {
        matchesAtLeastOneFilter = filters.regions.includes(
          property.city.region.name
        );
      }

      if (filters.bedrooms) {
        matchesAtLeastOneFilter =
          matchesAtLeastOneFilter ||
          property.bedrooms === Number(filters.bedrooms);
      }

      if (filters.price.from || filters.price.to) {
        const matchesPrice =
          (!filters.price.from || property.price >= Number(filters.price.from)) &&
          (!filters.price.to || property.price <= Number(filters.price.to));
        matchesAtLeastOneFilter = matchesAtLeastOneFilter || matchesPrice;
      }

      if (filters.area.from || filters.area.to) {
        const matchesArea =
          (!filters.area.from || property.area >= Number(filters.area.from)) &&
          (!filters.area.to || property.area <= Number(filters.area.to));
        matchesAtLeastOneFilter = matchesAtLeastOneFilter || matchesArea;
      }

      return matchesAtLeastOneFilter;
    });

    setFilteredRealEstateList(filteredRealEstateList);
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
          <div className="w-1/2">
            <FilterSection filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/create-listing"
              className="bg-[#F93B1D] hover:bg-[#DF3014] text-white text-[16px] font-medium px-6 py-4 rounded-xl transition duration-300 ease-in-out"
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
        <div className="w-1/2">
          <FilterSummary
            filters={filters}
            removeFilter={handleRemoveFilter}
            clearAllFilters={clearAllFilters}
          />
        </div>
        {filteredRealEstateList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRealEstateList.map((property) => (
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
            ))}
          </div>
        ) : (
          <p className="w-full">აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
        )}
      </div>
    </GuestLayout>
  );
};

export default Home;
