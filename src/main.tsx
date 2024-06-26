import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./Components/Welcome.tsx";
import Home from "./Components/Home/Home.tsx";
import ErrorPage from "./Components/ErrorPage.tsx";
import Login from "./Components/Login.tsx";
import SignUp from "./Components/SignUp.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "./Components/Loading.tsx"
import GoalSetup from "./Components/GoalSetup.tsx"
import Goals from "./Components/Goals.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome></Welcome>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/app",
    element: <App></App>,
    //element: <div>This should be the app</div>,
  },
  {
    path: "/login",
    //element: <App></App>,
    element: <Login></Login>,
  },
  {
    path: "/signUp",
    //element: <App></App>,
    element: <SignUp></SignUp>,
  },
  {
    path: "/loading",
    element: <Loading></Loading>,
  },
  {
    path: "/goalSetup",
    element: <GoalSetup></GoalSetup>
  },
  {
    path: "/goals",
    element: <Goals></Goals>
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
