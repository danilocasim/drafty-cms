import { useParams } from "react-router";
import { useCurrentPost } from "../../hooks/useCurrentPost";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import style from "./Postpage.module.css";

function Postpage() {
  const { postId } = useParams();
  const { token, user } = useContext(AuthContext);
  const [editting, setEditting] = useState(null);

  const [updatedComment, setUpdatedComment] = useState(null);
  const [post] = useCurrentPost(
    `http://localhost:8000/blog/v1/post/${postId}`,
    token
  );
  console.log(post);

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [recentComment, setRecentComment] = useState(null);

  function toggleEditComment(id, content) {
    if (id === editting) return setEditting(null);
    setEditting(id);

    setUpdatedComment(content);
  }

  function onChangeContent(e) {
    setContent(e.target.value);
  }

  function onChangeUpdateComment(e) {
    setUpdatedComment(e.target.value);
  }
  useEffect(() => {
    fetch(`http://localhost:8000/blog/v1/post/${postId}/comment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data.data);
        console.log(data.data);
      });
  }, [postId, token, recentComment]);

  function addComment() {
    fetch(`http://localhost:8000/blog/v1/post/${postId}/comment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ content: content, userId: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecentComment(data.data);
        setContent("");
      });
  }

  function deleteComment(id) {
    fetch(`http://localhost:8000/blog/v1/post/${postId}/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({ content: content, userId: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecentComment(data.data);
      });
  }

  function editComment(id) {
    fetch(`http://localhost:8000/blog/v1/post/${postId}/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ content: updatedComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecentComment(data.data);
      });

    setEditting(null);
  }

  return (
    <Fragment>
      {post && (
        <div className={style.postWrapper}>
          <div className={style.postHeader}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.createdAt}</p>
            <p> {"Authored By: " + user.username}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <div className={style.commentsWrapper}>
            <h3>Responses</h3>
            <div>
              <input
                type='text'
                name='content'
                value={content}
                id='content'
                placeholder='What are your thoughts?'
                onChange={onChangeContent}
              />
              <button onClick={addComment}>Submit</button>
            </div>
            <div className={style.comments}>
              {comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    <p>
                      {comment.User.username}{" "}
                      {post.userId == user.id && <i>Author</i>}
                    </p>
                    {!editting && (
                      <div>
                        <p> {comment.content}</p>
                      </div>
                    )}
                    {editting == comment.id && (
                      <div>
                        <input
                          value={updatedComment}
                          type='text'
                          name='content'
                          id='content'
                          onChange={onChangeUpdateComment}
                        />
                        <button onClick={() => editComment(comment.id)}>
                          Update
                        </button>
                      </div>
                    )}
                    <button onClick={() => deleteComment(comment.id)}>
                      Delete
                    </button>
                    {comment.userId == user.id && (
                      <button
                        onClick={() =>
                          toggleEditComment(comment.id, comment.content)
                        }
                      >
                        {comment.id === editting && "Close"}
                        {comment.id !== editting && "Edit"}
                      </button>
                    )}
                  </div>
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
