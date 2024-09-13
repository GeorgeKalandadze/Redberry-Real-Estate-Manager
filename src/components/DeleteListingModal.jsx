import React from "react";
import { motion } from "framer-motion";
import useClickOutside from "../hooks/useClickOutside";

const DeleteListingModal = ({ isOpen, onClose, onDelete }) => {
  // Use the hook to detect clicks outside the modal
  const modalRef = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-lg shadow-lg px-30 py-6 w-[400px] relative"
        ref={modalRef} // Attach the ref to the modal div
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl text-[20px] text-center mb-6">
          გსურთ წაშალოთ ლისტინგი?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            className="text-[#F93B1D] border border-[#F93B1D] text-[16px] font-medium px-4 py-2 rounded-xl"
            onClick={onClose} // Fix typo: onclose -> onClose
          >
            გაუქმება
          </button>
          <button
            onClick={onDelete}
            className="bg-[#F93B1D] text-white text-[16px] font-medium px-4 py-2 rounded-xl"
          >
            დადასტურება
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteListingModal;
