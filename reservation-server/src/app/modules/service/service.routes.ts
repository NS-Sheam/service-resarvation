import { Router } from "express";
import { USER_ROLE } from "../user/user.const";
import { ServiceControllers } from "./service.controller";
import auth from "../../middlewares/auth";
import textToJsonParser from "../../middlewares/textToJsonParser";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";

const router = Router();

router.get("/:id", ServiceControllers.getSingleService);
router.get("/", ServiceControllers.getAllServices);

router.post(
  "/",
  upload.array("files", 10),
  textToJsonParser,
  auth(USER_ROLE.admin, USER_ROLE.provider),

  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.addService,
);
router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.provider),
  upload.array("files", 10),
  textToJsonParser,

  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService,
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.provider),
  ServiceControllers.deleteService,
);

export const ServiceRoutes = router;
