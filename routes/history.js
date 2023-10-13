const express = require("express");
const router = express.Router({ mergeParams: true });

const controller = require("../controllers/history");
const {
  history: { validateHistory },
} = require("./validations");

router.get("/", validateHistory, controller.get);

module.exports = router;
