import React, { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import InputGroup from "../../components/InputGroup";
import CustomSelect from "../../components/CustomSelect";
import CustomRadio from "../../components/CustomRadio";
import TextareaGroup from "../../components/TextareaGroup";
import ImageUpload from "../../components/ImageUpload";
import { useGlobalContext } from "../../contexts/Context";
import { ValidateListing } from "../../validation/validation";
import axiosClient from "../../config/axiosClient";

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
    agents,
    setValidationErrors,
    handleRadioChange,
    fetchRealEstateList,
  } = useGlobalContext();

  const handleAgentChange = (agent) => {
    const updatedListing = {
      ...listing,
      agent_id: agent,
    };

    setListing(updatedListing);

    const errors = ValidateListing(updatedListing);

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      agent_id: errors.agent_id,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = ValidateListing(listing);
    if (Object.values(validation).some((error) => error === "invalid")) {
      setValidationErrors(validation);
      return;
    }

    const formData = new FormData();
    formData.append("address", listing.address);
    formData.append("zip_code", listing.zip_code);
    formData.append("region_id", listing.region_id.value);
    formData.append("city_id", listing.city_id.value);
    formData.append("price", listing.price);
    formData.append("area", listing.area);
    formData.append("bedrooms", listing.bedrooms);
    formData.append("description", listing.description);
    formData.append("agent_id", listing.agent_id.value);
    formData.append("is_rental", listing.is_rental);

    if (listing?.image?.url) {
      const response = await fetch(listing.image.url);
      const blob = await response.blob();
      formData.append("image", blob, listing.image.url);
    }

    try {
      const response = await axiosClient.post("/real-estates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      setListing({
        address: "",
        zip_code: "",
        region_id: null,
        city_id: null,
        price: "",
        area: "",
        bedrooms: "",
        description: "",
        image: {},
        agent_id: null,
      });

      setValidationErrors({});
      fetchRealEstateList();
    } catch (error) {
      console.error("Error adding listing:", error.response?.data || error);
    }
  };
  
  

  return (
    <GuestLayout>
      <div className="flex justify-center">
        <div className="w-[790px] flex gap-8 flex-col items-center">
          <h1 className="text-[32px] font-bold ">ლისტინგის დამატება</h1>
          <form className="w-full flex flex-col gap-12" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">გარიგების ტიპი</h2>
              <CustomRadio
                options={[
                  { label: "იყიდება", value: "0" },
                  { label: "ქირავდება", value: "1" },
                ]}
                name="is_rental"
                selectedValue={listing?.is_rental}
                onChange={(name, value) =>
                  handleRadioChange(
                    name,
                    value,
                    listing,
                    setListing,
                    ValidateListing
                  )
                }
              />
              <div className="flex items-center gap-3 mt-1">
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    stroke:
                      validationErrors?.is_rental === "valid"
                        ? "#45A849"
                        : validationErrors?.is_rental === "invalid"
                        ? "#F93B1D"
                        : "black",
                  }}
                >
                  <path
                    d="M11 1.40918L4.125 9.591L1 5.87199"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  className={`font-medium text-[14px] ${
                    validationErrors?.is_rental === "valid"
                      ? "text-green-500"
                      : validationErrors?.is_rental === "invalid"
                      ? "text-red-500"
                      : "text-[#85858D]"
                  }`}
                >
                  აირჩიეთ გარიგების ტიპი
                </p>
              </div>
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
                options={agents?.map((agent) => ({
                  label: `${agent.name} ${agent.surname}`,
                  value: agent.id,
                }))}
                placeholder="აირჩიე აგენტი"
                onChange={handleAgentChange}
                value={listing.agent_id}
                isValid={validationErrors?.agent_id}
              />
            </div>
            <div className="flex justify-end items-center gap-4">
              <button
                type="button"
                className="bg-[#F93B1D] text-white text-[16px] font-medium px-6 py-4 rounded-xl"
                onClick={() => window.history.back()}
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
