import React from "react";
import { motion } from "framer-motion";
import InputGroup from "./InputGroup";
import ImageUpload from "./ImageUpload";
import { useGlobalContext } from "../contexts/Context";

const AgentModal = () => {
  const { isAgentModalOpen, setIsAgentModalOpen } = useGlobalContext();

  if (!isAgentModalOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-lg shadow-lg p-8 w-[790px] z-50 relative"
      >
        <h1 className="text-[32px] font-bold mb-6 text-center">
          აგენტის დამატება
        </h1>
        <form className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-full flex gap-6">
              <InputGroup
                label="სახელი"
                type="text"
                hint="მინიმუმ ორი სიმბოლო"
                name="firstName"
              />
              <InputGroup
                label="გვარი"
                type="text"
                hint="მინიმუმ ორი სიმბოლო"
                name="lastName"
              />
            </div>
            <div className="w-full flex gap-6">
              <InputGroup
                label="ელ.ფოსტა"
                type="email"
                hint="უნდა იყოს ელ.ფოსტის ფორმატი"
                name="email"
              />
              <InputGroup
                label="ტელეფონის ნომერი"
                type="text"
                hint="მინიმუმ 9 სიმბოლო"
                name="phoneNumber"
              />
            </div>

            <ImageUpload label="ატვირთეთ ფოტო" />
          </div>

          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => setIsAgentModalOpen(false)}
              className="bg-[#F93B1D] text-white text-[16px] font-medium px-6 py-4 rounded-xl"
            >
              გაუქმება
            </button>
            <button className="text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-6 py-4 rounded-xl">
              დაამატე აგენტი
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AgentModal;
