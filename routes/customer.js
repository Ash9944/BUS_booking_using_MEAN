const express = require("express");
const router = express.Router();
const customerController = require("../services/customer");

router.get("/customers", function (req, res) {
    customerController.getAllUserDetails()
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.get("/customers/:id", (req, res) => {
    customerController.getuser(req.params.id)
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/addcustomers", (req, res) => {
    customerController.addBooking(req.body)
        .then((resp) => res.send(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/insertcustomers", (req, res) => {
    console.log(req.body)
    customerController.addCustomer(req.body)
        .then((resp) => res.send("success"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.delete("/delcust", (req, res) => {
    console.log(req.body)
    customerController.deletecustomer(req.body.employeeId)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/updcust", (req, res) => {
    customerController.updateCustomer(req.body)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/findcust", (req, res) => {
    customerController.getcustbyquery(req.body)
        .then((resp) => res.send(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

module.exports = router;