import { Outlet, Link, useNavigate } from "react-router";

import { AuthContext } from "./context";
import { useLoginStatus } from "./hooks/useLoginStatus";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useLoginStatus(token);
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }
  return (
    <AuthContext value={{ user, token, logout }}>
      <div>
        <nav>
          <Link to='/'>Home</Link>
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
          {user && <Link to='/addPost'>Post</Link>}
          {user && <button onClick={logout}>Logout</button>}
        </nav>
        <Outlet />
      </div>
    </AuthContext>
  );
}

export default App;
