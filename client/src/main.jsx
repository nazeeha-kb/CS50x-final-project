import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout.jsx";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Tasks from "./pages/Tasks/Tasks.jsx";
import Completed from "./pages/Completed/Completed.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/completed", element: <Completed /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
