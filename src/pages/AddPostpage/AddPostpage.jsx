import { useContext, useState } from "react";
import { AuthContext } from "../../context";

function AddPostpage() {
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function onChangeContent(e) {
    setContent(e.target.value);
  }

  function addPost(e) {
    e.preventDefault();
    fetch("http://localhost:8000/blog/v1/post", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        title: title,
        content: content,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setContent("");
    setTitle("");
  }
  return (
    <form>
      <label htmlFor='title'>Title</label>
      <input
        onChange={onChangeTitle}
        value={title}
        type='text'
        name='title'
        id='title'
      />

      <label htmlFor='content'>Content</label>
      <input
        onChange={onChangeContent}
        value={content}
        type='text'
        name='content'
        id='content'
      />

      <button onClick={addPost}>Add Post</button>
    </form>
  );
}

export default AddPostpage;
