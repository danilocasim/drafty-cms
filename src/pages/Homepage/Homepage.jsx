import { useMyAllPosts } from "../../hooks/useMyAllPosts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import PostCard from "../../components/PostCard/PostCard";
import style from "./Homepage.module.css";

function Homepage() {
  const { token, user } = useContext(AuthContext);
  const [modifiedPost, setModifiedPost] = useState(null);

  const [publishStatus, setPublishStatus] = useState(true);

  const [publicPost, publicLoading, publicError] = useMyAllPosts(
    "public",
    modifiedPost,
    token
  );

  const [privatePost, privateLoading, privateError] = useMyAllPosts(
    "private",
    modifiedPost,
    token
  );

  function togglePublishStatus(status) {
    setPublishStatus(status);
  }

  function changePublishStatus(postId) {
    fetch(`http://localhost:8000/blog/v1/post/${postId}/publish`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "PUT",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setModifiedPost(data);
      });
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
        setModifiedPost(data.data);
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
    <div className={style.container}>
      {user && (
        <div className={style.btnWrapper}>
          <button
            className={publishStatus ? style.darkBtn : ""}
            onClick={() => togglePublishStatus(true)}
          >
            Public
          </button>
          <button
            className={!publishStatus ? style.darkBtn : ""}
            onClick={() => togglePublishStatus(false)}
          >
            Private
          </button>
        </div>
      )}
      {publishStatus && (
        <PostCard
          posts={publicPost}
          changePublishStatus={changePublishStatus}
          deletePost={deletePost}
        ></PostCard>
      )}

      {!publishStatus && (
        <PostCard
          posts={privatePost}
          changePublishStatus={changePublishStatus}
          deletePost={deletePost}
        ></PostCard>
      )}
    </div>
  );
}
export default Homepage;
