import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/auth/Auth";
import ChangePassword from "../pages/auth/ChangePassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Services from "../pages/service/Services";
import Providers from "../pages/provider/Providers";
import Service from "../pages/service/Service";
import Provider from "../pages/provider/Provider";
import MyServices from "../pages/provider/MyServices";
import AddService from "../pages/provider/AddService";
import MyBookings from "../pages/booking/MyBookings";
import SingleMyBooking from "../pages/booking/SingleMyBooking";

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
        path: "/services/:id",
        element: <Service />,
      },
      {
        path: "/providers",
        element: <Providers />,
      },
      {
        path: "/providers/:id",
        element: <Provider />,
      },
      {
        path: "/provider/my-services",
        element: <MyServices />,
      },
      {
        path: "/provider/add-service",
        element: <AddService />,
      },
      {
        path: "/provider/edit-service/:id",
        element: <AddService />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/my-bookings/:id",
        element: <SingleMyBooking />,
      },
    ],
  },
]);

export default router;
