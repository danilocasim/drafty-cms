import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function submitLogin() {
    fetch("http://localhost:8000/blog/v1/login", {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", "Beaerer " + data.token);
        setUser(data.user);
      });

    navigate("/");
  }

  return (
    <div>
      <label htmlFor='email'>Email</label>
      <input id='email' name='email' onChange={onChangeEmail} type='email' />

      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        onChange={onChangePassword}
        type='password'
      />

      <button onClick={submitLogin} type='submit'>
        Submit
      </button>
    </div>
  );
}

export default Login;
