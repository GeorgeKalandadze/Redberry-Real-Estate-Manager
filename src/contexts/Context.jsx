import { createContext, useContext, useState, useEffect } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { ValidateListing } from "../validation/validation";
import axiosClient from "../config/axiosClient";

const initialListingInfo = {
  address: "",
  image: {},
  region_id: null, // Changed from region object to region_id
  city_id: null, // Changed from city object to city_id
  zip_code: "",
  price: "",
  area: "",
  bedrooms: "",
  is_rental: "",
  description: "",
  agent_id: null,
};

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [listing, setListing] = useSessionStorage(
    "listing",
    initialListingInfo
  );
  const [validationErrors, setValidationErrors] = useSessionStorage(
    "listingErrors",
    {}
  );
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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

  const filteredCities = listing?.region_id.value
    ? cities.filter((city) => city.region_id === listing?.region_id.value)
    : [];

  const handleRegionChange = (region) => {
    const updatedListing = {
      ...listing,
      region_id: region || null, // Storing only the region_id
      city_id: null, // Reset city_id when region changes
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
      city_id: city, // Storing only the city_id
    };
    setSelectedCity(city);
    setListing(updatedListing);

    const errors = ValidateListing(updatedListing);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      city_id: errors.city_id,
    }));
  };

  const handleTextInputChange = (e) => {
    const { value, name } = e.target;
    const updatedListing = { ...listing, [name]: value };
    const errors = ValidateListing(updatedListing);
    setListing(updatedListing);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name],
    }));
  };

  const handleImageUpload = (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const selectedImage = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const fileName = selectedImage.name;
        const updatedListing = {
          ...listing,
          image: { url: dataUrl, name: fileName },
        };
        setListing(updatedListing);
        const imageErrors = ValidateListing(updatedListing).image;
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          image: imageErrors,
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageDelete = () => {
    setListing((prevListing) => ({
      ...prevListing,
      image: {},
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      image: "invalid",
    }));
  };

  return (
    <AppContext.Provider
      value={{
        listing,
        setListing,
        validationErrors,
        setValidationErrors,
        handleTextInputChange,
        handleImageUpload,
        handleImageDelete,
        isAgentModalOpen,
        setIsAgentModalOpen,
        cities,
        regions,
        selectedRegion,
        selectedCity,
        filteredCities,
        handleRegionChange,
        handleCityChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
