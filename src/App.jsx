import { Outlet, Link } from "react-router";

function App() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
