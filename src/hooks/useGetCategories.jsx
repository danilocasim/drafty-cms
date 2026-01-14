import { useEffect, useState } from "react";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getCategories() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/category/`, {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (!response.ok) {
          setCategories([]);
          return;
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  return [categories, loading, error];
};
