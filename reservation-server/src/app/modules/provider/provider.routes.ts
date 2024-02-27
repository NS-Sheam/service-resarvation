import { Router } from "express";

import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";
import { USER_ROLE } from "../user/user.const";
import { ProviderControllers } from "./provider.controller";
import { ProviderValidations } from "./provider.validation";

const router = Router();
router.get("/:id", ProviderControllers.getSingleProvider);
router.get("/", ProviderControllers.getAllProviders);
router.patch(
  "/:id",
  upload.single("file"),
  textToJsonParser,
  auth(USER_ROLE.admin, USER_ROLE.provider),
  validateRequest(ProviderValidations.updateProviderValidationSchema),
  ProviderControllers.updateProvider,
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.provider),
  ProviderControllers.deleteProvider,
);

export const ProviderRoutes = router;
