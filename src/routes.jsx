import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Errorpage from "./pages/Errorpage/Errorpage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
];

export default routes;
