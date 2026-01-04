import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { Editor } from "@tinymce/tinymce-react";

function AddPostpage() {
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState(false);

  const editorRef = useRef(null);

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }
  function togglePublish(e) {
    const isPublish = e.target.value;
    if (isPublish == "true") {
      setPublish(true);
    }
    if (isPublish == "false") {
      setPublish(false);
    }
    console.log(isPublish);
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
      <input
        onChange={onChangeTitle}
        value={title}
        type='text'
        name='title'
        id='title'
      />
      <br />
      <label htmlFor='content'>Content</label>

      <br />
      <Editor
        apiKey='ng2kh043o0lxb0npjv2syptz0ld38dj0y8ny4nlnlnwf0bp7'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      <p>Publish this post?</p>
      <input
        onChange={togglePublish}
        type='radio'
        name='publish'
        id='true'
        value={true}
        required
      />
      <label htmlFor='true'>Yes</label>

      <input
        onChange={togglePublish}
        type='radio'
        name='publish'
        id='false'
        value={false}
        required
        defaultChecked
      />
      <label htmlFor='false'>false</label>
      <br />
      <button onClick={addPost}>Add Post</button>
    </form>
  );
}

export default AddPostpage;
