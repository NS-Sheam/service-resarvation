import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CustomerRoutes } from "../modules/customer/customer.routes";
import { ProviderRoutes } from "../modules/provider/provider.routes";
import { ServiceRoutes } from "../modules/service/service.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/customers",
    route: CustomerRoutes,
  },
  {
    path: "/providers",
    route: ProviderRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
