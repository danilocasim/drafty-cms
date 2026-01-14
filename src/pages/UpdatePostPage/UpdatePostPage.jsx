import { useContext, useEffect, useRef, useState, Fragment } from "react";
import { AuthContext } from "../../context";
import ContentEditor from "../../components/ContentEditor/ContentEditor";
import { useNavigate, useParams } from "react-router";
import RadioBtn from "../../components/RadioBtn/RadioBtn";
import Input from "../../components/Input/Input";
import style from "./UpdatePostPage.module.css";
import { useGetCategories } from "../../hooks/useGetCategories";

function UpdatePostPage() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);

  const editorRef = useRef(null);

  const { postId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [category, setCategory] = useState("");
  const [isAddNewCategory, setIsAddNewCategory] = useState(false);

  const [categories] = useGetCategories();

  useEffect(() => {
    fetch(`${API_URL}/post/${postId}`, {
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
        setCategory(post.category.name);
      });
  }, [postId, token]);

  function onChangeCategory(e) {
    setCategory(e.target.value);
  }

  function switchExistingOrAddNew() {
    setIsAddNewCategory(!isAddNewCategory);
  }

  function updatePost(e) {
    e.preventDefault();
    fetch(`${API_URL}/post/` + postId, {
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
        categoryName: category,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setTitle("");
    setDescription("");
    setCategory("");

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
        <button type='button' onClick={switchExistingOrAddNew}>
          {!isAddNewCategory
            ? "Add new category"
            : "Select existing categories"}
        </button>
        {!isAddNewCategory && (
          <Fragment>
            <label htmlFor='category'>Choose a category:</label>
            <select
              onChange={onChangeCategory}
              name='category'
              id='category'
              required
              value={category}
            >
              <option disabled hidden>
                Select a category
              </option>
              {categories &&
                categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
            </select>
          </Fragment>
        )}

        {isAddNewCategory && (
          <Fragment>
            <label htmlFor='category'>Input new category</label>
            <input
              type='text'
              value={category}
              onChange={onChangeCategory}
              name='category'
            />
          </Fragment>
        )}
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
