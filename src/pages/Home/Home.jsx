import React from "react";
import GuestLayout from "../../layouts/GuestLayout";
import Card from "../../components/Card";
import FilterSection from "../../components/FIlterSection";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/Context";


const Home = () => {
  const { setIsAgentModalOpen, realEstateList } = useGlobalContext();
   
  console.log(realEstateList);
  
  return (
    <GuestLayout>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center  justify-between">
          <FilterSection />
          <div className="flex items-center gap-4">
            <Link
              to="/create-listing"
              className="bg-[#F93B1D] text-white text-[16px] font-medium px-6 py-4 rounded-xl"
            >
              + ლისტინგის დამატება
            </Link>
            <button
              onClick={() => setIsAgentModalOpen(true)}
              className=" text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-6 py-4 rounded-xl"
            >
              + აგენტის დამატება
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {realEstateList.length > 0 &&
            realEstateList.map((property) => (
              <Link to={`listing/${property.id}`}>
                <Card
                  key={property.id}
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
      </div>
    </GuestLayout>
  );
};

export default Home;
