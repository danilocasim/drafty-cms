import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";
import ContentEditor from "../../components/ContentEditor/ContentEditor";
import { useNavigate, useParams } from "react-router";
import RadioBtn from "../../components/RadioBtn/RadioBtn";
import Input from "../../components/Input/Input";
function UpdatePostPage() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
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
        setTitle(post.title);
        setContent(post.content);
      });
  }, [postId, token]);

  function updatePost(e) {
    e.preventDefault();
    console.log(publish);
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
        userId: user.id,
        isPublish: publish,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setTitle("");

    editorRef.current.setContent("");
    navigate("/");
  }
  return (
    <form>
      <label htmlFor='title'>Title</label>
      <Input setState={setTitle} state={title}></Input>
      <br />
      <label htmlFor='content'>Content</label>

      <br />
      <ContentEditor content={content} editorRef={editorRef}></ContentEditor>

      <p>Publish this post?</p>
      <RadioBtn setState={setPublish} state={publish} value={true}></RadioBtn>
      <label htmlFor='true'>Yes</label>
      <RadioBtn setState={setPublish} state={publish} value={false}></RadioBtn>

      <label htmlFor='false'>false</label>
      <br />
      <button onClick={updatePost}>Update Post</button>
    </form>
  );
}

export default UpdatePostPage;
