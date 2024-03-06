import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.customer),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get(
  "/customer",
  auth(USER_ROLE.customer),
  BookingControllers.customerBooking,
);

router.get(
  "/provider",
  auth(USER_ROLE.provider),
  BookingControllers.providerBooking,
);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.provider),
  BookingControllers.getSingleBooking,
);
router.get("/service/:id", BookingControllers.serviceBooking);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.provider),
  BookingControllers.cancelBooking,
);

export const BookingRoutes = router;
