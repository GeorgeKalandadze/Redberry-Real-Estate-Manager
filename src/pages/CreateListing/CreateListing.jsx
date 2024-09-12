import React, { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import InputGroup from "../../components/InputGroup";
import CustomSelect from "../../components/CustomSelect";
import CustomRadio from "../../components/CustomRadio";
import TextareaGroup from "../../components/TextareaGroup";
import ImageUpload from "../../components/ImageUpload";
import { useGlobalContext } from "../../contexts/Context";
import { ValidateListing } from "../../validation/validation";

const CreateListing = () => {
  const {
    listing,
    setListing,
    regions,
    handleInputChange,
    handleRegionChange,
    filteredCities,
    selectedRegion,
    handleCityChange,
    validationErrors,
    handleImageUpload,
    handleImageDelete,
  } = useGlobalContext();

  const [selectedCardType, setSelectedCardType] = useState("");

  return (
    <GuestLayout>
      <div className="flex justify-center">
        <div className="w-[790px] flex gap-8 flex-col items-center">
          <h1 className="text-[32px] font-bold ">ლისტინგის დამატება</h1>
          <form className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">გარიგების ტიპი</h2>
              <CustomRadio
                options={[
                  { label: "იყიდება", value: "იყიდება" },
                  { label: "ქირავდება", value: "ქირავდება" },
                ]}
                name="transactionType"
                selectedValue={selectedCardType}
                onChange={(value) => setSelectedCardType(value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold">მდებარეობა</h2>
              <div className="w-full flex gap-6">
                <InputGroup
                  label="მისამართი"
                  type="text"
                  hint="მინიმუმ ორი სიმბოლო"
                  name="address"
                  value={listing?.address}
                  onChange={(e) =>
                    handleInputChange(e, listing, setListing, ValidateListing)
                  }
                  isValid={validationErrors?.address}
                />
                <InputGroup
                  label="საფოსტო ინდექსი"
                  type="text"
                  hint="მხოლოდ რიცხვები"
                  name="zip_code"
                  value={listing?.zip_code}
                  onChange={(e) =>
                    handleInputChange(e, listing, setListing, ValidateListing)
                  }
                  isValid={validationErrors?.zip_code}
                />
              </div>
              <div className="w-full flex gap-6">
                <CustomSelect
                  label="რეგიონი *"
                  options={regions?.map((region) => ({
                    label: region.name,
                    value: region.id,
                  }))}
                  placeholder="აირჩიე"
                  onChange={handleRegionChange}
                  value={listing.region_id}
                  isValid={validationErrors?.region_id}
                />
                <CustomSelect
                  label="ქალაქი *"
                  options={filteredCities.map((city) => ({
                    label: city.name,
                    value: city.id,
                  }))}
                  placeholder="აირჩიე"
                  onChange={handleCityChange}
                  value={listing.city_id}
                  disabled={!selectedRegion}
                  isValid={validationErrors?.city_id}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold">ბინის დეტალები</h2>
              <div className="w-full flex gap-6">
                <InputGroup
                  label="ფასი"
                  type="text"
                  hint="მხოლოდ რიცხვები"
                  name="price"
                  value={listing?.price}
                  onChange={(e) =>
                    handleInputChange(e, listing, setListing, ValidateListing)
                  }
                  isValid={validationErrors?.price}
                />
                <InputGroup
                  label="ოთახების რაოდენობა"
                  type="text"
                  hint="მხოლოდ რიცხვები"
                  name="area"
                  value={listing?.area}
                  onChange={(e) =>
                    handleInputChange(e, listing, setListing, ValidateListing)
                  }
                  isValid={validationErrors?.area}
                />
              </div>
              <div className="w-1/2 flex pr-4">
                <InputGroup
                  label="საძინებლების რაოდენობა"
                  type="text"
                  hint="მინიმუმ ერთი საძინებელი"
                  name="bedrooms"
                  value={listing?.bedrooms}
                  onChange={(e) =>
                    handleInputChange(e, listing, setListing, ValidateListing)
                  }
                  isValid={validationErrors?.bedrooms}
                />
              </div>
              <TextareaGroup
                label="ბინის აღწერა"
                hint="მინიმუმ ხუთი სიტყვა"
                name="description"
                onChange={(e) =>
                  handleInputChange(e, listing, setListing, ValidateListing)
                }
                value={listing?.description}
                isValid={validationErrors?.description}
              />
              <ImageUpload
                label="ატვირთეთ ფოტო "
                handleChange={(e) =>
                  handleImageUpload(
                    e,
                    listing,
                    setListing,
                    ValidateListing,
                    "image"
                  )
                }
                values={listing?.image?.url}
                handleImageDelete={() =>
                  handleImageDelete(
                    listing,
                    setListing,
                    ValidateListing,
                    "image"
                  )
                }
                isValid={validationErrors?.image}
              />
            </div>

            <div className="w-1/2 flex pr-4 flex-col gap-4">
              <h2 className="text-[16px] font-bold">აგენტი</h2>
              <CustomSelect
                label="აირჩიე"
                placeholder="აირჩიე"
                onChange={(value) => setSelectedRegion(value)}
                value={selectedRegion}
              />
            </div>
            <div className="flex justify-end items-center gap-4">
              <button
                type="button"
                className="bg-[#F93B1D] text-white text-[16px] font-medium px-6 py-4 rounded-xl"
                onClick={() => window.history.back()} // Back navigation for cancel button
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className="text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-6 py-4 rounded-xl"
              >
                დამატება
              </button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default CreateListing;
