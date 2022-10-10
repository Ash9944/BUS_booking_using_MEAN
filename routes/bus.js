const express = require("express");
const router = express.Router();
const busController = require("../services/busService");

router.get("/", function (req, res) {
    busController.getAllBusDetails()
        .then((resp) => res.json({ data: resp }))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
});

router.get("/:departure/:arrival", function (req, res) {
    query1 = { arr: req.params.arrival, dep: req.params.departure }
    query1.time = req.headers.data
    busController.busFilterQuery(query1)
        .then((resp) => res.json(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/filter", function (req, res) {
    busController.busFilterQuery(req.body)
        .then((resp) => res.json(resp))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/update", function (req, res) {
    busController.updBus(req.body.query, req.body.detailsToUpdate)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.post("/add", function (req, res) {
    busController.addBus(req.body)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

router.delete("/delete", function (req, res) {
    console.log(req.body)
    busController.deleteBus(req.body.employeeId)
        .then((resp) => res.send("success !"))
        .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
})

module.exports = router;