import React from "react";
import LocationIcon from "../assets/location.png";
import BedIcon from "../assets/bed.png";
import MailIndexIcon from "../assets/mail-index.png";
import SpaceIcon from "../assets/space.png";

const Card = ({ image, price, address, beds, area, mailIndex, label }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg min-w-full">
      <div className="relative">
        <img src={image} alt="Property" className="w-full h-[300px] object-cover" />
        {label && (
          <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-2xl">
            {label}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col">
        <div className="text-[28px] font-bold text-black">{price} ₾</div>
        <div className="text-gray-600 text-[16px] flex items-center mb-3">
          <img src={LocationIcon} alt="Location" className="w-4 h-4 mr-2" />
          <span>{address}</span>
        </div>
        <div className="flex  gap-6 text-[16px] items-center text-gray-600">
          <div className="flex items-center">
            <img src={BedIcon} alt="Beds" className="w-4 h-4 mr-1" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center">
            <img src={SpaceIcon} alt="Space" className="w-4 h-4 mr-1" />
            <span>{area} მ²</span>
          </div>
          <div className="flex items-center">
            <img
              src={MailIndexIcon}
              alt="Mail Index"
              className="w-4 h-4 mr-1"
            />
            <span>{mailIndex}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
