const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.get("/v1/api/bus", busController.getBus);
router.get("/v1/api/bus/:departure/:arrival",busController.getBusinroutes)
module.exports = router;
