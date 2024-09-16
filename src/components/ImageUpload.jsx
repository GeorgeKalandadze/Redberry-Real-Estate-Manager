import React from "react";
import TrashIcon from "../assets/trash.png";

const ImageUpload = ({
  label,
  isValid,
  handleChange,
  values,
  handleImageDelete,
}) => {
  const borderColor =
    isValid?.size === "invalid" || isValid?.type === "invalid"
      ? "border-red-500"
      : "border-[#c3c2c8]";

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="font-bold text-[14px]">{label}*</label>
      <div
        className={`w-full h-[150px] ${borderColor} border-dashed border-2 rounded-lg flex items-center justify-center relative`}
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

      {!values && isValid?.size === "invalid" && (
        <p className="text-red-500 text-sm mt-1">
          სურათი არ არის ატვირთული. გთხოვთ ატვირთოთ სურათი.
        </p>
      )}
      {isValid?.size === "invalid" && values && (
        <p className="text-red-500 text-sm mt-1">
          ფაილი ძალიან დიდია, მაქსიმალური ზომა 1MB.
        </p>
      )}
      {isValid?.type === "invalid" && values && (
        <p className="text-red-500 text-sm mt-1">
          მხოლოდ JPG, JPEG, PNG ტიპის ფაილები დასაშვებია.
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
