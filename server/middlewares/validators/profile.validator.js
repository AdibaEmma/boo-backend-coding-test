const { body, validationResult } = require("express-validator");

const profileValidationRules = () => {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 50 })
        .withMessage("Name must be no more than 50 characters"),
      body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 20 })
        .withMessage("A minimum of 50 characters is required"),
      body("age")
        .optional()
        .isInt({ min: 18 })
        .withMessage("Age must be 18+"),
    ];
}


const validateProfile = (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);

  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: result.mapped() });
};

const errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors,
}) => {
  // Build your resulting errors however you want! String, object, whatever - it works!

  return `${msg}`;
};

module.exports = {
    profileValidationRules,
    validateProfile
}