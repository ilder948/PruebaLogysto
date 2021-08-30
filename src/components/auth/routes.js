const express = require("express").Router;
const router = express();
const controller = require("./controller");

router.post("/login", controller.Login);
router.post("/register", controller.register);

module.exports = router;
