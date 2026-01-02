import { useMyAllPosts } from "../../hooks/useMyAllPosts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { Link } from "react-router";

function Homepage() {
  const { token, user } = useContext(AuthContext);
  const [publishStatus, setPublishStatus] = useState(true);

  const [publicPost, publicLoading, publicError] = useMyAllPosts(
    "public",
    token
  );

  const [privatePost, privateLoading, privateError] = useMyAllPosts(
    "private",
    token
  );

  function togglePublishStatus(status) {
    setPublishStatus(status);
  }

  if (publicLoading || privateLoading) return <h1>Loading...</h1>;
  if (publicError || privateError)
    return (
      <h1>
        Error: {publicError.message} {privateError.message}
      </h1>
    );
  return (
    <div>
      <h1>Home</h1>
      <h1>
        Hello, {user && user.username} {!user && "Guest"}
      </h1>

      <button onClick={() => togglePublishStatus(true)}>Public</button>
      <button onClick={() => togglePublishStatus(false)}>Private</button>

      {publishStatus &&
        publicPost.data &&
        publicPost.data.map((post, index) => {
          const postLink = "/post/" + post.id;
          return (
            <div key={index}>
              <Link to={postLink}>{post.title}</Link>
            </div>
          );
        })}

      {!publishStatus &&
        privatePost.data &&
        privatePost.data.map((post, index) => {
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
