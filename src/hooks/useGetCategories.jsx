import { useEffect, useState } from "react";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCategories() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/blog/v1/category/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        );

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
