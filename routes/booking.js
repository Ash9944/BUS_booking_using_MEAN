const express = require("express");
const router = express.Router();
const bookingController = require("../services/booking");

// Use like this

router.post("/v1/api/booking", bookingController.addBooking);
router.get("/v1/api/booking/:id", bookingController.getBooking);
module.exports = router;
