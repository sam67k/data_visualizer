const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");
const historyRouter = require("./history");
const isAuthenticatedUser = require("../middlewares/isAuthenticatedUser");
const {
  user: { validateUsername, validateEmail, validateSignin, validateSignup },
} = require("./validations");

router.use("/:userId/histories", isAuthenticatedUser, historyRouter);

router.get("/username", validateUsername, controller.username);
router.get("/email", validateEmail, controller.email);
router.get("/signin", validateSignin, controller.signin);
router.post("/signup", validateSignup, controller.signup);

module.exports = router;
