import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect format").isEmail(),
  body("password", " Password must contain more than 3 symbols").isLength({
    min: 3,
  }),
  body("fullName", "Name is not correct").isLength({ min: 3 }),
];

export const loginValidation = [
  body("email", "Incorrect format").isEmail(),
  body("password", " Password must contain more than3 symbols").isLength({
    min: 3,
  }),
];
