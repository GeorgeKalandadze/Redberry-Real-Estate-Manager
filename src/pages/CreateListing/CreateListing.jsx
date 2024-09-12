import React, { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import InputGroup from "../../components/InputGroup";
import CustomSelect from "../../components/CustomSelect";
import CustomRadio from "../../components/CustomRadio";
import TextareaGroup from "../../components/TextareaGroup";
import ImageUpload from "../../components/ImageUpload";

const CreateListing = () => {
  const options = ["იმერეთი", "სამეგრელო", "სამცხე", "გურია"];
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");

  const handleSelectChange = (value) => {
    setSelectedRegion(value);
  };

  const handleCardTypeChange = (value) => {
    setSelectedCardType(value);
  };

  return (
    <GuestLayout>
      <div className="flex justify-center">
        <div className="w-[790px] flex gap-8 flex-col items-center">
          <h1 className="text-[32px] font-bold ">ლისტინგის დამატება</h1>
          <form className="w-full flex flex-col gap-12" action="">
            {/* Transaction Type */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">გარიგების ტიპი</h2>
              <CustomRadio
                options={[
                  { label: "იიგდება", value: "იგდება" },
                  { label: "ქირავდება", value: "ქირავდება" },
                ]}
                name="transactionType"
                selectedValue={selectedCardType}
                onChange={handleCardTypeChange}
              />
            </div>

            {/* Location Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold">მდებარეობა</h2>
              <div className="w-full flex gap-6">
                <InputGroup
                  label="მისამართი"
                  type="text"
                  hint="მინიმუმ ორი სიმბოლო"
                  name="address"
                />
                <InputGroup
                  label="სართული"
                  type="number"
                  hint="მინიმუმ ერთი ციფრი"
                  name="floor"
                />
              </div>
              <div className="w-full flex gap-6">
                <CustomSelect
                  label="რეგიონი *"
                  options={options}
                  placeholder="აირჩიე"
                  onChange={handleSelectChange}
                  value={selectedRegion}
                />
                <CustomSelect
                  label="ქალაქი *"
                  options={options}
                  placeholder="აირჩიე"
                  onChange={handleSelectChange}
                  value={selectedRegion}
                />
              </div>
            </div>

            {/* Apartment Details Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold">ბინის დეტალები</h2>
              <div className="w-full flex gap-6">
                <InputGroup
                  label="ფასი"
                  type="number"
                  hint="მინიმუმ ერთი ციფრი"
                  name="price"
                />
                <InputGroup
                  label="ოთახების რაოდენობა"
                  type="number"
                  hint="მინიმუმ ერთი ოთახი"
                  name="rooms"
                />
              </div>
              <div className="w-1/2 flex pr-4">
                <InputGroup
                  label="საძინებლების რაოდენობა"
                  type="number"
                  hint="მინიმუმ ერთი საძინებელი"
                  name="bedrooms"
                />
              </div>
              <TextareaGroup
                label="ბინის აღწერა"
                hint="მინიმუმ ხუთი სიტყვა"
                name="description"
              />
              <ImageUpload label="ატვირთეთ ფოტო" />
            </div>
            <div className="w-1/2 flex pr-4 flex-col gap-4">
              <h2 className="text-[16px] font-bold">აგენტი</h2>
              <CustomSelect
                label="აირჩიე"
                options={options}
                placeholder="აირჩიე"
                onChange={handleSelectChange}
                value={selectedRegion}
              />
            </div>
            <div className="flex justify-end items-center gap-4">
              <button
                to="/create-listing"
                className="bg-[#F93B1D] text-white text-[16px] font-medium px-6 py-4 rounded-xl"
              >
                გაუქმება
              </button>
              <button className=" text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-6 py-4 rounded-xl">
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
