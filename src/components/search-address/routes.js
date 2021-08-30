const express = require("express").Router;
const router = express();
const controller = require("./controller");

router.get("/search", controller.search);

module.exports = router;
