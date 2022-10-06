const express = require("express");
const router = express.Router();
const user = require("../services/userService");

router.get("/", function (req, res) {
    user.getAllUserDetails()
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.get("/:id", (req, res) => {
    user.getuser(req.params.id)
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/Booking", (req, res) => {
    user.addBooking(req.body)
        .then((resp) => res.send(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/add", (req, res) => {
    console.log(req.body)
    user.adduser(req.body)
        .then((resp) => res.send("success"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.delete("/delete", (req, res) => {
    console.log(req.body)
    user.deleteuser(req.body.employeeId)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/update", (req, res) => {
    user.updateuser(req.body)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/filter", (req, res) => {
    user.getuserbyquery(req.body)
        .then((resp) => res.send(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

module.exports = router;