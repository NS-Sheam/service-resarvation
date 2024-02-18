import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "../customer/customer.validation";
import auth from "../../middlewares/auth";
import textToJsonParser from "../../middlewares/textToJsonParser";
import { upload } from "../../utils/sendImageToCloudinary";
import { ProviderValidations } from "../provider/provider.validation";
import { USER_ROLE } from "./user.const";

const router = Router();

router.post(
  "/create-customer",
  upload.single("file"),
  textToJsonParser,
  validateRequest(CustomerValidations.createCustomerValidationSchema),
  UserControllers.createCustomer,
);

router.post(
  "/create-provider",
  validateRequest(ProviderValidations.createProviderValidationSchema),
  UserControllers.createProvider,
);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.vendor),
  UserControllers.getMe,
);
export const UserRoutes = router;
