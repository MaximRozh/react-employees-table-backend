import express from "express";
import { createEmployeeValidation } from "../validations/employees.js";
import { EmployeesController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";

const emoployeesRouter = express.Router();

emoployeesRouter.get("/", EmployeesController.getAllEmployees);

emoployeesRouter.post(
  "/",
  checkAuth,
  createEmployeeValidation,
  handleValidationErrors,
  EmployeesController.createEmployee
);

emoployeesRouter.patch(
  "/:id",
  checkAuth,
  createEmployeeValidation,
  handleValidationErrors,
  EmployeesController.updateEmployee
);

emoployeesRouter.delete("/:id", checkAuth, EmployeesController.deleteEmployee);

export default emoployeesRouter;
