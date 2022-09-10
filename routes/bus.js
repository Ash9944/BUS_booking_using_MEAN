const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.get("/v1/api/bus", busController.getBus);
module.exports = router;
