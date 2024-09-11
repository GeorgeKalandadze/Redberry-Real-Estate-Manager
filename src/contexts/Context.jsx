import { Children, createContext, useContext } from "react";


const AppContext = createContext({

})


export const AppProvider = ({Children}) => {
    return (
        <AppContext.Provider
         value={{}}
        >
            {Children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
  return useContext(AppContext);
};