import { useEffect, useState } from "react";

export const useFetchGet = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          mode: "cors",
        });

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, [url]);

  return [data, loading, error];
};
