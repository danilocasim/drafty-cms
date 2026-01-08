import style from "./Post.module.css";

function Post({ post, user }) {
  return (
    <div className={style.postContainer}>
      <div className={style.postHeader}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <p>{post.createdAt}</p>
        <p> {user && "Authored By: " + user.username}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}
export default Post;
