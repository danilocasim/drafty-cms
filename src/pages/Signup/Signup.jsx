import { useState } from "react";
import { useNavigate } from "react-router";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function addUser(e) {
    e.preventDefault();

    fetch("http://localhost:8000/blog/v1/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: "AUTHOR",
      }),
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert("Login:", data);
        navigate("/login");
      });
  }

  return (
    <form>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          name='username'
          onChange={onChangeUsername}
          type='text'
        />
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' onChange={onChangeEmail} type='email' />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          onChange={onChangePassword}
          type='password'
        />
        <button onClick={addUser} type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
}

export default Signup;
