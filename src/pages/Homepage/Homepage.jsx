import { useMyAllPosts } from "../../hooks/useMyAllPosts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { Link } from "react-router";

function Homepage() {
  const { token, user } = useContext(AuthContext);
  const [deletedPost, setDeletedPost] = useState(null);

  const [publishStatus, setPublishStatus] = useState(true);

  const [publicPost, publicLoading, publicError] = useMyAllPosts(
    "public",
    deletedPost,
    token
  );

  const [privatePost, privateLoading, privateError] = useMyAllPosts(
    "private",
    deletedPost,
    token
  );

  function togglePublishStatus(status) {
    setPublishStatus(status);
  }

  function deletePost(postId) {
    fetch("http://localhost:8000/blog/v1/post/" + postId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      mode: "cors",
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDeletedPost(data.data);
      });
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

      {user && (
        <div>
          {" "}
          <button onClick={() => togglePublishStatus(true)}>Public</button>
          <button onClick={() => togglePublishStatus(false)}>Private</button>
        </div>
      )}

      {publishStatus &&
        publicPost.data &&
        publicPost.data.map((post, index) => {
          const postLink = "/post/" + post.id;
          return (
            <div key={index}>
              <Link to={postLink}>{post.title}</Link>
              <Link to={"/updatePost/" + post.id}>Update</Link>
              <button onClick={() => deletePost(post.id)}>Delete</button>
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
              <Link to={"/updatePost/" + post.id}>Update</Link>

              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
}
export default Homepage;
