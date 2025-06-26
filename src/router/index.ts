import DefaultLayout from "@/layout/DefaultLayout";
import { Home } from "@/pages";
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
    ],
  },
]);
