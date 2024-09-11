import axios from "axios";


const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    common: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
  },
});

export default axiosClient;
