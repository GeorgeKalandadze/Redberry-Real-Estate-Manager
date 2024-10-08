import React from "react";
import { motion } from "framer-motion";
import InputGroup from "./InputGroup";
import ImageUpload from "./ImageUpload";
import { useGlobalContext } from "../contexts/Context";
import { ValidateAgent } from "../validation/validation";
import axiosClient from "../config/axiosClient";
import useClickOutside from "../hooks/useClickOutside";

const AgentModal = () => {
  const {
    agent,
    setAgent,
    validationErrors,
    setValidationErrors,
    isAgentModalOpen,
    setIsAgentModalOpen,
    handleInputChange,
    handleImageUpload,
    handleImageDelete,
    fetchAgents,
  } = useGlobalContext();

  const clearAgentErrors = () => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      avatar: { size: "", type: "" },
    }));
  };

  const closeModal = () => {
    clearAgentErrors();
    setAgent({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      avatar: {},
    });
    setIsAgentModalOpen(false);
  };

  const modalRef = useClickOutside(() => {
    closeModal();
  });

  if (!isAgentModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = ValidateAgent(agent);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      ...validation,
    }));

    const hasInvalidFields =
      Object.values(validation).some((error) => error === "invalid") ||
      validation.avatar.size === "invalid" ||
      validation.avatar.type === "invalid";

    if (hasInvalidFields) {
      return;
    }

    const formData = new FormData();
    formData.append("name", agent.firstName);
    formData.append("surname", agent.lastName);
    formData.append("email", agent.email);
    formData.append("phone", agent.phoneNumber);

    const response = await fetch(agent.avatar.url);
    const blob = await response.blob();
    formData.append("avatar", blob, agent.avatar.url);

    try {
      const response = await axiosClient.post("/agents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          avatar: { size: "", type: "" },
        }));

        setAgent({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          avatar: {},
        });

        setIsAgentModalOpen(false);
        fetchAgents();
      }
    } catch (error) {
      console.error("Error adding agent:", error.response?.data || error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center backdrop-blur-md"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-lg shadow-lg p-8 w-[790px] z-50 relative"
        ref={modalRef}
      >
        <h1 className="text-[32px] font-bold mb-6 text-center">
          აგენტის დამატება
        </h1>
        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="w-full flex gap-6">
              <InputGroup
                label="სახელი"
                type="text"
                hint="მინიმუმ ორი სიმბოლო"
                name="firstName"
                value={agent?.firstName}
                onChange={(e) =>
                  handleInputChange(e, agent, setAgent, ValidateAgent)
                }
                isValid={validationErrors?.firstName}
              />
              <InputGroup
                label="გვარი"
                type="text"
                hint="მინიმუმ ორი სიმბოლო"
                name="lastName"
                value={agent?.lastName}
                onChange={(e) =>
                  handleInputChange(e, agent, setAgent, ValidateAgent)
                }
                isValid={validationErrors?.lastName}
              />
            </div>
            <div className="w-full flex gap-6">
              <InputGroup
                label="ელ.ფოსტა"
                type="email"
                hint="გამოიყენეთ @redberry.ge ფოსტა"
                name="email"
                value={agent?.email}
                onChange={(e) =>
                  handleInputChange(e, agent, setAgent, ValidateAgent)
                }
                isValid={validationErrors?.email}
              />
              <InputGroup
                label="ტელეფონის ნომერი"
                type="text"
                hint="მხოლოდ რიცხვები"
                name="phoneNumber"
                value={agent?.phoneNumber}
                onChange={(e) =>
                  handleInputChange(e, agent, setAgent, ValidateAgent)
                }
                isValid={validationErrors?.phoneNumber}
              />
            </div>

            <ImageUpload
              label="ატვირთეთ ფოტო"
              handleChange={(e) =>
                handleImageUpload(e, agent, setAgent, ValidateAgent, "avatar")
              }
              values={agent?.avatar?.url}
              handleImageDelete={() =>
                handleImageDelete(agent, setAgent, ValidateAgent, "avatar")
              }
              isValid={validationErrors?.avatar}
            />
          </div>

          <div className="flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="border border-[#F93B1D] text-[#F93B1D]  text-[16px] font-medium px-6 py-4 rounded-xl"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="bg-[#F93B1D] hover:bg-[#DF3014] text-white text-[16px] font-medium px-6 py-4 rounded-xl transition duration-300 ease-in-out"
            >
              დაამატე აგენტი
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AgentModal;
