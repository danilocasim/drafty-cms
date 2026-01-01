import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Errorpage from "./pages/Errorpage/Errorpage.jsx";
import AddPostpage from "./pages/AddPostpage/AddPostpage.jsx";
import Postpage from "./pages/PostPage/Postpage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/addPost", element: <AddPostpage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/post/:postId", element: <Postpage /> },
    ],
  },
];

export default routes;
