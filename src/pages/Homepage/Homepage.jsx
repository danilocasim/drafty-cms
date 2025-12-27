import { useFetchGet } from "../../hooks/useFetchGet";

function Homepage() {
  const [data, loading, error] = useFetchGet(
    "http://localhost:8000/blog/v1/post"
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      <h1>Home</h1>
      {data &&
        data.map((post, index) => {
          return <p key={index}>{post.content}</p>;
        })}
    </div>
  );
}
export default Homepage;
