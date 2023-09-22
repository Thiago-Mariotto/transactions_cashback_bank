import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "../components/header";
import Extract from "../pages/extract";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

const insertHeader = (element: JSX.Element) => {
  return (
    <>
      <Header />
      {element}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: insertHeader(<Home />),
  },
  {
    path: "/register",
    element: insertHeader(<Register />),
  },
  {
    path: "/login",
    element: insertHeader(<Login />),
  },
  {
    path: "/extract",
    element: insertHeader(<Extract />),
  }
]);

export default router;