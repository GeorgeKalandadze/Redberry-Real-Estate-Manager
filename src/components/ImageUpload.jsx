import React, { useState } from "react";

const ImageUpload = ({ label }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="font-bold text-[14px]">{label}*</label>
      <div className="w-full h-[150px] border-dashed border-2 border-[#c3c2c8] rounded-lg flex items-center justify-center relative">
        {!image ? (
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
                onChange={handleImageUpload}
              />
            </label>
          </>
        ) : (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
