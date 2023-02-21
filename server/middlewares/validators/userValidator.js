import { body, validationResult } from "express-validator";

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
      .trim()
      .isISO8601()
      .toDate()
      .withMessage("Must be a valid date"),
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
