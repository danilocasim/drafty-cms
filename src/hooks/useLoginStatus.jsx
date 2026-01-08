import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
export const useLoginStatus = (token) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/blog/v1/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          mode: "cors",
        });

        if (!response.ok) {
          navigate("/login");
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [token, navigate]);

  return [user, setUser, loading, error];
};
