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

export const BookingRoutes = router;
