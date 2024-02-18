import { Router } from "express";
import { CustomerControllers } from "./customer.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "./customer.validation";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";
import { USER_ROLE } from "../user/user.const";

const router = Router();
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  CustomerControllers.getSingleCustomer,
);
router.get("/", auth(USER_ROLE.admin), CustomerControllers.getAllCustomers);
router.patch(
  "/:id",
  upload.single("file"),
  textToJsonParser,
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(CustomerValidations.updateCustomerValidationSchema),
  CustomerControllers.updateCustomer,
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  CustomerControllers.deleteCustomer,
);

export const CustomerRoutes = router;
