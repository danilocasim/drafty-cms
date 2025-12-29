import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

function Homepage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token] = useOutletContext();
  const url = "http://localhost:8000/blog/v1/post/mine";
  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          mode: "cors",
        });

        if (!response.ok) {
          setData([]);
          return;
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, [url, token]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      <h1>Home</h1>
      {data.data &&
        data.data.map((post, index) => {
          return <p key={index}>{post.content}</p>;
        })}
    </div>
  );
}
export default Homepage;
