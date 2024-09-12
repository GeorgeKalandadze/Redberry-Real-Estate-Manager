import { createContext, useContext, useState, useEffect } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { ValidateListing, ValidateAgent } from "../validation/validation"; // Import both validation functions
import axiosClient from "../config/axiosClient";

const initialListingInfo = {
  address: "",
  image: {},
  region_id: null,
  city_id: null,
  zip_code: "",
  price: "",
  area: "",
  bedrooms: "",
  is_rental: "",
  description: "",
  agent_id: null,
};

const initialAgentInfo = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  avatar: {},
};

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [listing, setListing] = useSessionStorage(
    "listing",
    initialListingInfo
  );
  const [agent, setAgent] = useSessionStorage("agent", initialAgentInfo);
  const [validationErrors, setValidationErrors] = useSessionStorage(
    "errors",
    {}
  );
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axiosClient.get("/regions");
        setRegions(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosClient.get("/cities");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axiosClient.get("/agents");
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchAgents();
  }, []);
  


  const filteredCities = listing?.region_id?.value
    ? cities.filter((city) => city.region_id === listing?.region_id?.value)
    : [];

  // Generalized handler for input changes (both listing and agent)
  const handleInputChange = (e, entity, setEntity, validateFn) => {
    const { name, value } = e.target;
    const updatedEntity = { ...entity, [name]: value };
    const errors = validateFn(updatedEntity);

    setEntity(updatedEntity);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name],
    }));
  };

  const handleImageUpload = (
    event,
    entity,
    setEntity,
    validateFn,
    fieldName = "avatar"
  ) => {
    const { files } = event.target;
    if (files && files[0]) {
      const selectedImage = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const updatedEntity = {
          ...entity,
          [fieldName]: { url: dataUrl, file: selectedImage }, // Store both url and file
        };
        setEntity(updatedEntity);

        const imageErrors = validateFn(updatedEntity)[fieldName];
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: imageErrors, // Update the entire avatar object
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
  };


  const handleImageDelete = (
    entity,
    setEntity,
    validateFn,
    fieldName = "avatar"
  ) => {
    const updatedEntity = { ...entity, [fieldName]: {} };
    setEntity(updatedEntity);

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: { size: "invalid", type: "invalid" }, 
    }));
  };

  const handleRegionChange = (region) => {
    const updatedListing = {
      ...listing,
      region_id: region || null,
      city_id: null,
    };
    setSelectedRegion(region);
    setSelectedCity(null);
    setListing(updatedListing);

    const errors = ValidateListing(updatedListing);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      region_id: errors.region_id,
      city_id: errors.city_id,
    }));
  };

  const handleCityChange = (city) => {
    const updatedListing = {
      ...listing,
      city_id: city,
    };
    setSelectedCity(city);
    setListing(updatedListing);

    const errors = ValidateListing(updatedListing);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      city_id: errors.city_id,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        listing,
        agent,
        validationErrors,
        setValidationErrors,
        handleInputChange,
        handleImageUpload,
        handleImageDelete,
        handleRegionChange,
        handleCityChange,
        filteredCities,
        isAgentModalOpen,
        setIsAgentModalOpen,
        cities,
        regions,
        selectedRegion,
        selectedCity,
        setListing,
        setAgent,
        agents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
