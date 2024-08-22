import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Shared/ui/layout";
import { Home } from "app/Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/infotecsUserTable/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
