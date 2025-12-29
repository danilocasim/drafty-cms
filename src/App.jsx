import { Outlet, Link, useNavigate } from "react-router";

import { AuthContext } from "./context";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/auth", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      });
  }, [token, navigate]);

  function logout() {
    localStorage.removeItem("token");
    console.log(user);
    setUser("");
    navigate("/");
  }
  return (
    <AuthContext value={{ setUser, logout }}>
      <div>
        <nav>
          <Link to='/'>Home</Link>
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
          {user && <button onClick={logout}>Logout</button>}
        </nav>
        <Outlet />
      </div>
    </AuthContext>
  );
}

export default App;
