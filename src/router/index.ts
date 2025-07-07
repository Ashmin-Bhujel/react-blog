import { dbService } from "@/appwrite";
import AuthLayout from "@/layout/AuthLayout";
import DefaultLayout from "@/layout/DefaultLayout";
import { Home, Login, SignUp } from "@/pages";
import ArticleAdd from "@/pages/ArticleAdd";
import ArticleEdit from "@/pages/ArticleEdit";
import ArticleList from "@/pages/ArticleList";
import ArticleView from "@/pages/ArticleView";
import MyArticleList from "@/pages/MyArticleList";
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
        path: "/article/list",
        Component: ArticleList,
      },
      {
        path: "/article/my-articles",
        Component: MyArticleList,
      },
      {
        path: "/article/:articleId",
        Component: ArticleView,
      },
      {
        path: "/article/add",
        Component: ArticleAdd,
      },
      {
        path: "/article/edit/:articleId",
        Component: ArticleEdit,
        loader: async ({ params }) => {
          const { articleId } = params;

          if (articleId) {
            const existingArticle = await dbService.getArticleById(articleId);
            if (existingArticle) {
              return existingArticle;
            }
          }
        },
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
