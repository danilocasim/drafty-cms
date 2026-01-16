import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
export const useLoginStatus = (token) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/auth`, {
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
        navigate("/login");
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [token, navigate]);

  return [user, setUser, loading, error];
};
