import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Calling API with query:", query);
      const response = await axios.post(`${API_URL}/product_search`, { query });
      console.log("API Response:", response.data);
      if (response.status === 200) {
        setResults(response.data);
      } else {
        setError("Failed to fetch search results.");
      }
    } catch (err) {
      console.error("API Error:", err.response || err.message);
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    searchProducts,
  };
};

export default useSearch;
