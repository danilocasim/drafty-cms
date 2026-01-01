import { useMyAllPosts } from "../../hooks/useMyAllPosts";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { Link } from "react-router";

function Homepage() {
  const { token, user } = useContext(AuthContext);

  const [posts, loading, error] = useMyAllPosts(token);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      <h1>Home</h1>
      <h1>
        Hello, {user && user.username} {!user && "Guest"}
      </h1>
      {posts.data &&
        posts.data.map((post, index) => {
          const postLink = "/post/" + post.id;
          return (
            <div key={index}>
              <Link to={postLink}>{post.title}</Link>
            </div>
          );
        })}
    </div>
  );
}
export default Homepage;
