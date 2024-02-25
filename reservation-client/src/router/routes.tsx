import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/auth/Auth";
import ChangePassword from "../pages/auth/ChangePassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Services from "../pages/Services";
import Providers from "../pages/Providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/auth/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/providers",
        element: <Providers />,
      },
    ],
  },
]);

export default router;
