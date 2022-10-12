import express from "express";
import { UserController } from "../controllers/index.js";
import { registerValidation, loginValidation } from "../validations/auth.js";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";

const userAuthRouter = express.Router();

userAuthRouter.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
userAuthRouter.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

userAuthRouter.get("/userInfo", checkAuth, UserController.getUserInfo);

export default userAuthRouter;
