const { body } = require("express-validator");

exports.signupValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),

  body("role")
    .isIn(["student", "admin"])
    .withMessage("Invalid role"),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  body("role")
    .isIn(["student", "admin"])
    .withMessage("Invalid role"),
];
