import { Outlet, Link, useNavigate } from "react-router";
import { useFetchGet } from "./hooks/useFetchGet";

import { AuthContext } from "./context";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [data] = useFetchGet("http://localhost:8000/blog/v1/auth");
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }
  return (
    <AuthContext value={{ user, setUser, logout }}>
      <div>
        <nav>
          <Link to='/'>Home</Link>
          {!data.user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
          {data.user && <button onClick={logout}>Logout</button>}
        </nav>
        <Outlet />
      </div>
    </AuthContext>
  );
}

export default App;
