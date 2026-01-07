import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import Input from "../../components/Input/Input";
import RadioBtn from "../../components/RadioBtn/RadioBtn";
import ContentEditor from "../../components/ContentEditor/ContentEditor";
import style from "./AddPostpage.module.css";

function AddPostpage() {
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        description: description,
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
      <div className={style.wrapper}>
        <label htmlFor='title'>Title</label>
        <Input setState={setTitle} state={title}></Input>
      </div>
      <div className={style.wrapper}>
        <label htmlFor='description'>Description</label>
        <Input setState={setDescription} state={description}></Input>
      </div>
      <div className={style.wrapper}>
        <label htmlFor='content'>Content</label>
        <ContentEditor
          editorRef={editorRef}
          content={"<p>This is the initial value</p>"}
        ></ContentEditor>
      </div>

      <div className={style.wrapper}>
        <p>Publish this post?</p>
        <div>
          <RadioBtn
            setState={setPublish}
            state={publish}
            value={true}
          ></RadioBtn>
          <label htmlFor='true'>Yes</label>
        </div>
        <div>
          <RadioBtn
            setState={setPublish}
            state={publish}
            value={false}
          ></RadioBtn>
          <label htmlFor='false'>false</label>
        </div>
      </div>
      <button onClick={addPost}>Add Post</button>
    </form>
  );
}

export default AddPostpage;
