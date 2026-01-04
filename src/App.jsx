import { Outlet, useNavigate } from "react-router";

import { AuthContext } from "./context";
import { useLoginStatus } from "./hooks/useLoginStatus";
import Navigation from "./components/Navigation/Navigation";
import style from "./styles/index.module.css";

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
      <div className={style.container}>
        <Navigation></Navigation>
        <Outlet />
      </div>
    </AuthContext>
  );
}

export default App;
