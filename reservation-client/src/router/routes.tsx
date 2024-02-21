import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      //   {
      //     path: "/auth",
      //     element: <Auth />,
      //   },
      //   {
      //     path: "/product/:id",
      //     element: <ProductDetails />,
      //   },

      //   {
      //     path: "customer",
      //     element: (
      //       <ProtectedRoute role="customer">
      //         <Dashboard />
      //       </ProtectedRoute>
      //     ),
      //     children: routesGenerator(customerDashboardItems),
      //   },
      //   {
      //     path: "vendor",
      //     element: (
      //       <ProtectedRoute role="vendor">
      //         <Dashboard />
      //       </ProtectedRoute>
      //     ),
      //     children: routesGenerator(vendorDashboardItems),
      //   },
    ],
  },
]);

export default router;
