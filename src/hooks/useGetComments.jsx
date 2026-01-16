import { useEffect, useState } from "react";

export const useGetComments = (
  postId,
  token,
  deletedComment,
  updatedComment,
  newComment
) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/post/${postId}/comment`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          mode: "cors",
        });

        if (!response.ok) {
          setComments([]);
          return;
        }

        const data = await response.json();
        setComments(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [postId, token, deletedComment, updatedComment, newComment]);

  return [comments, loading, error];
};
