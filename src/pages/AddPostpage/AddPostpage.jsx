import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import Input from "../../components/Input/Input";
import RadioBtn from "../../components/RadioBtn/RadioBtn";
import ContentEditor from "../../components/ContentEditor/ContentEditor";

function AddPostpage() {
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState(false);

  const editorRef = useRef(null);

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
        content: editorRef.current.getContent(),
        userId: user.id,
        isPublish: publish,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setTitle("");

    editorRef.current.setContent("");
  }
  return (
    <form>
      <label htmlFor='title'>Title</label>
      <Input setState={setTitle} state={title}></Input>
      <br />
      <label htmlFor='content'>Content</label>

      <br />
      <ContentEditor
        editorRef={editorRef}
        content={"<p>This is the initial value</p>"}
      ></ContentEditor>

      <p>Publish this post?</p>
      <RadioBtn setState={setPublish} state={publish} value={true}></RadioBtn>

      <label htmlFor='true'>Yes</label>

      <RadioBtn setState={setPublish} state={publish} value={false}></RadioBtn>

      <label htmlFor='false'>false</label>
      <br />
      <button onClick={addPost}>Add Post</button>
    </form>
  );
}

export default AddPostpage;
