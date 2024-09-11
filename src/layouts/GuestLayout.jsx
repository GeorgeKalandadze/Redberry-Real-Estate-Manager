import React from "react";
import RedberryIcon from "../assets/redberry-logo.png";

const GuestLayout = ({ children }) => {
  return (
    <div className="max-w-[1920px] min-h-[1080px] bg-[#FFFFFF] flex flex-col">
      <div className="px-[142px] border-b border-[#DBDBDB] py-[38px]">
        <img src={RedberryIcon} alt="Redberry Logo" />
      </div>
      <div className="px-[142px] py-[38px]">{children}</div>
    </div>
  );
};

export default GuestLayout;
