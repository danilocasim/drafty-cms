import { useState, useContext } from "react";
import { AuthContext } from "../../context";

function Comment({
  comment,
  post,
  setUpdatedComment,
  updatedComment,
  setDeletedComment,
}) {
  const { token, user } = useContext(AuthContext);

  const [editing, setEditing] = useState(null);

  function onChangeUpdateComment(e) {
    setUpdatedComment(e.target.value);
  }

  function toggleEditComment(id, content) {
    if (id === editing) return setEditing(null);
    setEditing(id);

    setUpdatedComment(content);
  }

  function deleteComment(id) {
    fetch(`http://localhost:8000/blog/v1/post/${post.id}/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setDeletedComment(data.data);
      });
  }

  function editComment(id) {
    fetch(`http://localhost:8000/blog/v1/post/${post.id}/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ content: updatedComment }),
    })
      .then((response) => response.json())
      .then(() => {
        setUpdatedComment("");
        setEditing(null);
      });
  }

  return (
    <div key={comment.id}>
      <p>
        {comment.User.username} {post.userId == comment.userId && <i>Author</i>}
      </p>
      {!editing && (
        <div>
          <p> {comment.content}</p>
        </div>
      )}
      {editing == comment.id && (
        <div>
          <input
            value={updatedComment}
            type='text'
            name='content'
            id='content'
            onChange={onChangeUpdateComment}
          />
          <button onClick={() => editComment(comment.id)}>Update</button>
        </div>
      )}
      <button onClick={() => deleteComment(comment.id)}>Delete</button>
      {comment.userId == user.id && (
        <button onClick={() => toggleEditComment(comment.id, comment.content)}>
          {comment.id === editing && "Close"}
          {comment.id !== editing && "Edit"}
        </button>
      )}
    </div>
  );
}

export default Comment;
