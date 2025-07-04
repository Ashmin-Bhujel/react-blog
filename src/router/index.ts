import AuthLayout from "@/layout/AuthLayout";
import DefaultLayout from "@/layout/DefaultLayout";
import { Home, Login, SignUp } from "@/pages";
import ArticleAdd from "@/pages/ArticleAdd";
import ArticleList from "@/pages/ArticleList";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/article",
        Component: ArticleList,
      },
      {
        path: "/article/add",
        Component: ArticleAdd,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth",
        Component: Login,
      },
      {
        path: "/auth/signup",
        Component: SignUp,
      },
    ],
  },
]);
