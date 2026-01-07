function RadioBtn({ setState, state, value }) {
  function togglePublish(e) {
    const isPublish = e.target.value;
    if (isPublish == "true") {
      setState(true);
    }
    if (isPublish == "false") {
      setState(false);
    }
    console.log(isPublish);
  }
  return (
    <input
      title='radio'
      onChange={togglePublish}
      type='radio'
      name='publish'
      value={value}
      required
      checked={state == value}
    />
  );
}

export default RadioBtn;
