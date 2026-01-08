import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context";
import style from "./Navigation.module.css";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className={style.nav}>
      <h1 className={style.logo}>
        <Link to='/'>Drafty</Link>
      </h1>
      {user && (
        <div className={style.btnWrapper}>
          <Link to='/addPost'>Add Post</Link>

          <button className={style.logout} onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className={style.btnWrapper}>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
