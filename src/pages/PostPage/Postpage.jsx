import { useParams } from "react-router";
import { useCurrentPost } from "../../hooks/useCurrentPost";
import { useContext } from "react";
import { AuthContext } from "../../context";

function Postpage() {
  const { postId } = useParams();
  const { token } = useContext(AuthContext);
  const [post] = useCurrentPost(
    `http://localhost:8000/blog/v1/post/${postId}`,
    token
  );

  console.log(post);
  return (
    <div>
      {post && <p>{post.title}</p>}
      {post && <p>{post.content}</p>}
    </div>
  );
}

export default Postpage;
