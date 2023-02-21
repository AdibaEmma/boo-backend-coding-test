import { body, validationResult } from "express-validator";
import { User } from "../../models/User.js";

export const createUserValidationRules = () => {
  return [
    body("firstName")
      .exists({ checkFalsy: true })
      .withMessage("First name is required")
      .isString()
      .withMessage("First name must be letters")
      .bail()
      .isLength({ min: 2 })
      .withMessage("First name must be at least two letters long."),
    body("lastName")
      .exists({ checkFalsy: true })
      .withMessage("Last name is required")
      .bail()
      .isString()
      .withMessage("Last name must be letters")
      .bail()
      .isLength({ min: 2 })
      .withMessage("Name must be at least two letters long."),
    body("otherNames").isString().optional().withMessage("Name must be string"),
    body("email")
      .isEmail()
      .withMessage("Must be a valid email")
      .bail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already registered");
          }
        });
      }),
    body("birthdate")
      .isDate({ format: 'YYYY-MM-DD' })
  .withMessage('Invalid date format. Please use YYYY-MM-DD format.')
  .custom((value, { req }) => {
    // Check if user is at least 18 years old
    const birthdate = new Date(value);
    const age = Math.floor((new Date() - birthdate) / (1000 * 3600 * 24 * 365));
    if (age < 18) {
      throw new Error('You must be at least 18 years old to sign up.');
    }
    return true;
  })
  ];
};

export const validateUser = (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);

  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: result.mapped() });
};

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${msg}`;
};
