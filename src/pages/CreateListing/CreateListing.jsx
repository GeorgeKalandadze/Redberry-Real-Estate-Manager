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
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/real-estates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

     
      if (response.status === 201) {
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
          is_rental: "",
        });
        setIsLoading(false);
        setValidationErrors({});
        fetchRealEstateList();
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding listing:", error.response?.data || error);
    }
  };

  if (isLoading) {
    return (
      <div
        role="status"
        className="w-screen h-screen flex justify-center items-center"
      >
        <svg
          aria-hidden="true"
          className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-red-500"
          viewBox="0 0 100 101"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
        <div className="font-bold text-5xl ml-2">მიმდინარეობს ჩატვირთვა</div>
      </div>
    );
  }
  

  return (
    <GuestLayout>
      <div className="flex justify-center">
        <div className="w-[790px] flex gap-8 flex-col items-center">
          <h1 className="text-[20px] font-bold md:text-[32px]">ლისტინგის დამატება</h1>
          <form className="w-full flex flex-col gap-8 md:gap-16" onSubmit={handleSubmit}>
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
                      : "text-[#021526]"
                  }`}
                >
                  აირჩიეთ გარიგების ტიპი
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold">მდებარეობა</h2>
              <div className="w-full flex flex-col gap-6 md:flex-row">
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
              <div className="w-full flex flex-col gap-6 md:flex-row">
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
              <div className="w-full flex flex-col gap-6 md:flex-row">
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
                  label="ფართობი"
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
              <div className="w-full flex md:w-1/2 md:pr-4">
                <InputGroup
                  label="საძინებლების რაოდენობა"
                  type="text"
                  hint="მხოლოდ რიცხვები"
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

            <div className="w-full flex flex-col gap-4 md:w-1/2 md:pr-4">
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
            <div className="flex flex-col justify-end items-center gap-4 md:flex-row">
              <button
                type="button"
                className=" text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-6 py-4 rounded-xl"
                onClick={() => window.history.back()}
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className="bg-[#F93B1D] hover:bg-[#DF3014] text-white text-[16px] font-medium px-6 py-4 rounded-xl transition duration-300 ease-in-out"
              >
                დაამატე ლისტინგი
              </button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default CreateListing;
