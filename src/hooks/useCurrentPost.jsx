import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useCurrentPost = (url, token) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          mode: "cors",
        });

        const data = await response.json();
        setPost(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [url, navigate, token]);

  return [post, loading, error];
};
