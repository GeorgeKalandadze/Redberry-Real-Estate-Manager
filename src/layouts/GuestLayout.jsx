import React from "react";
import RedberryIcon from "../assets/redberry-logo.png";
import { Link } from "react-router-dom";
import AgentModal from "../components/AgentMoadal";
import { AnimatePresence } from "framer-motion";

const GuestLayout = ({ children }) => {
  return (
    <>
      <AgentModal />
      <AnimatePresence>
        <div className="max-w-[1920px] min-h-[1080px] bg-[#FFFFFF] flex flex-col ">
          <div className="px-[60px] border-b border-[#DBDBDB] py-[38px] 2xl:px-[130px]">
            <Link to="/">
              <img src={RedberryIcon} alt="Redberry Logo" />
            </Link>
          </div>
          <div className="px-[30px] xl:px-[60px] 2xl:px-[130px] py-[38px] w-full">
            {children}
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default GuestLayout;
