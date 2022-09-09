const express = require("express");
const router = express.Router();
const customerController = require("../services/customer");

router.post("/v1/api/customers", customerController.addNewCustomer);

router.get("/v1/api/customers",customerController.getall)

module.exports = router;
