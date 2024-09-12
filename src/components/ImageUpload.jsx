import React from "react";
import TrashIcon from "../assets/trash.png";

const ImageUpload = ({ label, isValid, handleChange, values, handleImageDelete }) => {

  console.log(isValid);
  
  const borderColor =
    isValid?.size && isValid?.type === "valid"
      ? "border-[#c3c2c8]"
      : isValid?.size && isValid?.type === "invalid"
      ? "border-red-500"
      : "border-[#c3c2c8]";

  const backgroundColor =
    isValid === "valid"
      ? "bg-[#F8FFF8]"
      : isValid === "invalid"
      ? "bg-[#FAF2F3]"
      : "";


  

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="font-bold text-[14px]">{label}*</label>
      <div
        className={`w-full h-[150px] ${borderColor}  border-dashed border-2 rounded-lg flex items-center justify-center relative`}
      >
        {!values ? (
          <>
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <span className="text-lg mr-2 rounded-full border border-black flex items-center justify-center w-4 h-4">
                +
              </span>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
                onChange={handleChange}
              />
            </label>
          </>
        ) : (
          <div className="relative">
            <img
              src={values}
              alt="Uploaded"
              className="w-[92px] h-[82px] object-cover rounded-lg"
            />
            <button
              onClick={handleImageDelete}
              className="absolute bottom-[-10px] right-[-10px] border border-black bg-white rounded-full p-1 shadow-sm"
            >
              <img src={TrashIcon} alt="Delete" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
