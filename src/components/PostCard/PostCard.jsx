import { Link } from "react-router";
import style from "./PostCard.module.css";
function PostCard({ posts, changePublishStatus, deletePost }) {
  return (
    <div className={style.posts}>
      {posts.data &&
        posts.data.map((post, index) => {
          const postLink = "/post/" + post.id;
          const isPublish = post.isPublish ? "Unpublish" : "Publish";
          return (
            <div className={style.post} key={index}>
              <Link to={postLink}>
                <h2>{post.title}</h2>
                <p className={style.descriptions}>{post.description}</p>
                <p>Category: {post.category.name}</p>
              </Link>
              <div className={style.btnWrapper}>
                <button onClick={() => changePublishStatus(post.id)}>
                  {isPublish}
                </button>
                <Link to={"/updatePost/" + post.id}>
                  <button>Update</button>
                </Link>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PostCard;
