import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect format").isEmail(),
  body("password", " Password must contain more than 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "Name is not correct").isLength({ min: 3 }),
];

export const loginValidation = [
  body("email", "Incorrect format").isEmail(),
  body("password", " Password must contain more than 5 symbols").isLength({
    min: 5,
  }),
];
