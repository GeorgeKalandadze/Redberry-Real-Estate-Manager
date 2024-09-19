import { createContext, useContext, useState, useEffect } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { ValidateListing } from "../validation/validation";
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
  const [filters, setFilters] = useSessionStorage("realEstateFilters", {
    regions: [],
    bedrooms: "",
    price: { from: "", to: "" },
    area: { from: "", to: "" },
  });
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [realEstateList, setRealEstateList] = useState([]);



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

  const fetchAgents = async () => {
    try {
      const response = await axiosClient.get("/agents");
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchRealEstateList = async () => {
    try {
      const response = await axiosClient.get("/real-estates");
      setRealEstateList(response.data);
    } catch (error) {
      console.error("Error fetching real estates:", error);
    }
  };

  useEffect(() => {
    fetchRealEstateList();
  }, []);

  //filtered cities according region
  const filteredCities = listing?.region_id?.value
    ? cities.filter((city) => city.region_id === listing?.region_id?.value)
    : [];

  //handle input change
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

  //handle image upload
  const handleImageUpload = (
    event,
    entity,
    setEntity,
    validateFn,
    fieldName = "image"
  ) => {
    const { files } = event.target;
    if (files && files[0]) {
      const selectedImage = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const updatedEntity = {
          ...entity,
          [fieldName]: { url: dataUrl, file: selectedImage },
        };
        setEntity(updatedEntity);

        const imageErrors = validateFn(updatedEntity)[fieldName];
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: imageErrors,
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
  };


  //handle image delete
  const handleImageDelete = (
    entity,
    setEntity,
    validateFn,
    fieldName = "image"
  ) => {
    const updatedEntity = { ...entity, [fieldName]: {} };
    setEntity(updatedEntity);

    const imageErrors = validateFn(updatedEntity)[fieldName];
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: { size: "invalid", type: "invalid" },
    }));
  };

  //handle region change
  const handleRegionChange = (region) => {
    const updatedListing = {
      ...listing,
      region_id: region || null,
      city_id: null,
    };
    setListing(updatedListing);
    const errors = ValidateListing(updatedListing);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      region_id: errors.region_id,
      city_id: errors.city_id,
    }));
  };

  //handle city change
  const handleCityChange = (city) => {
    const updatedListing = {
      ...listing,
      city_id: city,
    };
    setListing(updatedListing);
    const errors = ValidateListing(updatedListing);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      city_id: errors.city_id,
    }));
  };

  //handle radio change
  const handleRadioChange = (name, value, entity, setEntity, validateFn) => {
    const updatedEntity = { ...entity, [name]: value };
    const errors = validateFn(updatedEntity);
    setEntity(updatedEntity);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name],
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
        regions,
        cities,
        agents,
        setListing,
        setAgent,
        handleRadioChange,
        isAgentModalOpen,
        setIsAgentModalOpen,
        setRealEstateList,
        realEstateList,
        fetchRealEstateList,
        fetchAgents,
        setFilters,
        filters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
