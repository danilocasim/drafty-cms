import { useParams } from "react-router";
import { useCurrentPost } from "../../hooks/useCurrentPost";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../context";
import style from "./Postpage.module.css";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import AddComment from "../../components/AddComment/AddComment";
import { useGetComments } from "../../hooks/useGetComments";

function Postpage() {
  const { token, user } = useContext(AuthContext);
  const { postId } = useParams();
  const [post] = useCurrentPost(
    `http://localhost:8000/blog/v1/post/${postId}`,
    token
  );
  const [newComment, setNewComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [deletedComment, setDeletedComment] = useState(null);

  const [comments] = useGetComments(
    postId,
    token,
    deletedComment,
    updatedComment,
    newComment
  );

  return (
    <Fragment>
      {post && (
        <div className={style.postWrapper}>
          <Post post={post} user={user}></Post>
          <div className={style.commentsWrapper}>
            <h3>Responses</h3>
            <AddComment
              setNewComment={setNewComment}
              post={post}
              user={user}
              token={token}
            ></AddComment>
            <div className={style.comments}>
              {comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    post={post}
                    updatedComment={updatedComment}
                    setUpdatedComment={setUpdatedComment}
                    setDeletedComment={setDeletedComment}
                  ></Comment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Postpage;
