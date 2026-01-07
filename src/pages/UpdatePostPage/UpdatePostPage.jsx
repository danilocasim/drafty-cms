import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";
import ContentEditor from "../../components/ContentEditor/ContentEditor";
import { useNavigate, useParams } from "react-router";
import RadioBtn from "../../components/RadioBtn/RadioBtn";
import Input from "../../components/Input/Input";
import style from "./UpdatePostPage.module.css";

function UpdatePostPage() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);

  const editorRef = useRef(null);

  const { postId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/blog/v1/post/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        const post = data.data;

        setPublish(post.isPublish);
        setDescription(post.description);
        setTitle(post.title);
        setContent(post.content);
      });
  }, [postId, token]);

  function updatePost(e) {
    e.preventDefault();
    fetch("http://localhost:8000/blog/v1/post/" + postId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "PUT",
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
    setDescription("");

    editorRef.current.setContent("");
    navigate("/");
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
        <ContentEditor content={content} editorRef={editorRef}></ContentEditor>
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
      <button onClick={updatePost}>Update Post</button>
    </form>
  );
}

export default UpdatePostPage;
