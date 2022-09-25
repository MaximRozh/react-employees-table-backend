import { body } from "express-validator";

export const createEmployeeValidation = [
  body("firstName", "Incorrect firstname")
    .isLength({
      min: 2,
    })
    .isString(),
  body("lastName", "Incorrect lastName")
    .isLength({
      min: 2,
    })
    .isString(),
  body("fullName", "Name is not correct").isLength({ min: 4 }).isString(),
  body("birthYear", "Date of birth needs to be a valid date").isDate({
    format: "YYYY-MM-DD",
  }),
  body("position", "Position is not correct").isLength({ min: 3 }).isString(),
  body("salary", "Salary is not correct format").isNumeric(),
];
