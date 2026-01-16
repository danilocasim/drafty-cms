import { Fragment, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import Input from "../../components/Input/Input";
import RadioBtn from "../../components/RadioBtn/RadioBtn";
import ContentEditor from "../../components/ContentEditor/ContentEditor";
import style from "./AddPostpage.module.css";
import { useGetCategories } from "../../hooks/useGetCategories";

function AddPostpage() {
  const { token, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const [publish, setPublish] = useState(false);

  const editorRef = useRef(null);

  const [category, setCategory] = useState("");
  const [categories] = useGetCategories();

  const [isAddNewCategory, setIsAddNewCategory] = useState(false);

  function onChangeCategory(e) {
    setCategory(e.target.value);
  }

  function switchExistingOrAddNew() {
    setIsAddNewCategory(!isAddNewCategory);
  }

  function addPost(e) {
    e.preventDefault();
    fetch(`${API_URL}/post`, {
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
        categoryName: category,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setTitle("");
    setDescription("");
    setCategory("");
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
            >
              <option selected disabled hidden>
                Select a category
              </option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
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
        <ContentEditor
          editorRef={editorRef}
          content={`<p>Hello pota</p>`}
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
