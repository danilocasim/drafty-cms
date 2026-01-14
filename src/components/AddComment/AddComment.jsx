import { useState } from "react";

function AddComment({ setNewComment, post, user, token }) {
  const [commentContent, setCommentContent] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);
  function onChangeContent(e) {
    setCommentContent(e.target.value);
  }

  function addComment() {
    fetch(`${API_URL}/post/${post.id}/comment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ content: commentContent, userId: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCommentContent("");
        setNewComment(data.data);
      });
  }
  return (
    <div>
      <input
        type='text'
        name='content'
        value={commentContent}
        id='content'
        placeholder='What are your thoughts?'
        onChange={onChangeContent}
      />
      <button onClick={addComment}>Submit</button>
    </div>
  );
}
export default AddComment;
