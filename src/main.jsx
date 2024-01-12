import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/layout/Main";
import Home from "./components/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pages from "./components/pages/Pages";
import Invoice from "./components/pages/Invoice";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/pages/PrivateRoute";
import AuthContext from "./components/context/AuthContext";
import Display from "./components/pages/Display";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/dashboard/admin/Admin";
import Author from "./components/dashboard/author/Author";
import AllUsers from "./components/dashboard/admin/AllUsers";
import User from "./components/dashboard/user/User";
import MyAccounts from "./components/dashboard/user/MyAccounts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Display />,
      },
      {
        path: "/create",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/pages",
        element: (
          <PrivateRoute>
            <Pages />
          </PrivateRoute>
        ),
      },
      {
        path: "/invoice/:id",
        element: <Invoice />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/admin",
        element: <Admin />,
      },
      {
        path:'/dashboard/manage-user',
        element:<AllUsers/>
      },
      {
        path:"/dashboard/author",
        element:<Author/>
      },
      {
        path:'/dashboard/user-dashboard',
        element:<User/>
      },
      {
        path:'/dashboard/my-accounts',
        element:<MyAccounts/>
      }
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
