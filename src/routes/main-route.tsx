import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home-page/Home";
import AdminLogin from "../pages/admin-page/AdminLogin";
import Admin from "../pages/admin-page/Admin";
import AuthGuard from "../AuthGuard";

export enum Routes {
  HOME = "/",
  ADMIN_LOGIN = "/admin-login",
  ADMIN_PAGE = "/admin-page",
  NOT_FOUND = "*",
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: Routes.HOME,
        element: <Home />,
      },
      {
        path: Routes.ADMIN_LOGIN,
        element: <AdminLogin />,
      },
      {
        path: Routes.ADMIN_PAGE,
        element: (
          <AuthGuard>
            <Admin />
          </AuthGuard>
        ),
      },
      {
        path: Routes.NOT_FOUND,
        element: <Home />,
      },
    ],
  },
]);

export default appRouter;
