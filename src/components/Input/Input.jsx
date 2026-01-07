function Input({ setState, state }) {
  function onChangeTitle(e) {
    setState(e.target.value);
  }
  return (
    <input
      onChange={onChangeTitle}
      value={state}
      type='text'
      name='title'
      id='title'
    />
  );
}

export default Input;
