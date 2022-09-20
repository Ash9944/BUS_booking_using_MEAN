const { query } = require("express");
const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.post("/allbus", function (req, res) {
    busController.getAllUserDetails().then((resp) => {
        res.json({ data: resp })
    })
});

router.get("/bus/:departure/:arrival", function (req, res) {
    query1 = { arr: req.params.arrival, dep: req.params.departure }
    query1.time = req.headers.data
    busController.getBusinroutes(query1).then((resp) => {
        res.json(resp)
    })
})

router.post("/bus", function (req, res) {
    busController.getBusinroutes(req.body).then((resp) => {
        res.json(resp)
    }
    )
})

router.post("/updbus", function (req, res) {
    busController.updBus(req.body.query, req.body.detailsToUpdate).then((resp) => {
        res.send("sucess !")
    })
})

router.post("/adddbus", function (req, res) {
    busController.addBus(req.body).then((resp) => {
        res.send("sucess !")
    })
})

router.delete("/delbus", function (req, res) {
    console.log(req.body)
    busController.deleteBus(req.body.employeeId).then((resp) => {
        res.send("sucess !")
    })
})

module.exports = router;