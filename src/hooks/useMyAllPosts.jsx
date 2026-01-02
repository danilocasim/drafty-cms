import { useEffect, useState } from "react";

export const useMyAllPosts = (publishStatus, deletedPost, token) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8000/blog/v1/post/" + publishStatus,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            mode: "cors",
          }
        );

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
  }, [publishStatus, deletedPost, token]);

  return [posts, loading, error];
};
