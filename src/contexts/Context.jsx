import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{ user, setUser, isAgentModalOpen, setIsAgentModalOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
