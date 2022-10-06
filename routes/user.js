const express = require("express");
const router = express.Router();
const user = require("../services/userService");

router.get("/", function (req, res) {
    user.getAllUserDetails()
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.get("/customers/:id", (req, res) => {
    user.getuser(req.params.id)
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/addcustomers", (req, res) => {
    user.addBooking(req.body)
        .then((resp) => res.send(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/insertcustomers", (req, res) => {
    console.log(req.body)
    user.addCustomer(req.body)
        .then((resp) => res.send("success"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.delete("/delcust", (req, res) => {
    console.log(req.body)
    user.deletecustomer(req.body.employeeId)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/updcust", (req, res) => {
    user.updateCustomer(req.body)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/findcust", (req, res) => {
    user.getcustbyquery(req.body)
        .then((resp) => res.send(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

module.exports = router;