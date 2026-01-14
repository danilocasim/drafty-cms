import { useEffect, useState } from "react";

export const useMyAllPosts = (publishStatus, modifiedPost, token) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/post/` + publishStatus, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          mode: "cors",
        });

        if (!response.ok) {
          setPosts([]);
          return;
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [publishStatus, modifiedPost, token]);

  return [posts, loading, error];
};
