function Input({ setState, state, value = "title", type = "text" }) {
  function onChangeTitle(e) {
    setState(e.target.value);
  }
  return (
    <input
      onChange={onChangeTitle}
      value={state}
      type={type}
      name={value}
      id={value}
    />
  );
}

export default Input;
