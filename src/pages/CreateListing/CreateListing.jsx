import React, { useState } from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import CheckedSvg from '../../assets/checked-svg.svg'
import InputGroup from '../../components/InputGroup';
import CustomSelect from '../../components/CustomSelect';
const CreateListing = () => {
    const options = ["იმერეთი", "სამეგრელო", "სამცხე", "გურია"];
    const [selectedRegion, setSelectedRegion] = useState("");

    const handleSelectChange = (value) => {
      setSelectedRegion(value);
    };
  return (
    <GuestLayout>
      <div className="flex justify-center">
        <div className="w-[790px] flex gap-8 flex-col items-center">
          <h1 className="text-[32px] font-bold ">ლისტინგის დამატება</h1>
          <form className="w-full" action="">
            <div className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold">მდებარეობა</h2>
              <div className="w-full flex gap-6">
                <InputGroup />
                <InputGroup />
              </div>
              <div className="w-full flex gap-6">
                <CustomSelect
                  label="მისამართი *"
                  options={options}
                  placeholder="აირჩიე"
                  onChange={handleSelectChange}
                  value={selectedRegion}
                />
                <CustomSelect
                  label="მისამართი *"
                  options={options}
                  placeholder="აირჩიე"
                  onChange={handleSelectChange}
                  value={selectedRegion}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}

export default CreateListing