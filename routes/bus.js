const { query } = require("express");
const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.post("/v1/api/allbus", function (req, res) {
    busController.getAllUserDetails().then((resp) => {
        res.json({ data: resp })
    })
});
router.get("/v1/api/bus/:departure/:arrival", function (req, res) {
    query1 = { arr: req.params.arrival, dep: req.params.departure }
    query1.time = req.headers.data
    busController.getBusinroutes(query1).then((resp) => {
        res.json(resp)
    })
})
router.post("/v1/api/bus",function(req, res){
    busController.getBusinroutes(req.body).then((resp)=>{
        res.json(resp)
    }
    )
})

router.post("/v1/api/updbus", function (req, res) {
    // req.body.detailsToUpdate.departureTime = new Date(req.body.detailsToUpdate.departureTime)
    // req.body.detailsToUpdate.arrivalTime = new Date(req.body.detailsToUpdate.arrivalTime)
    busController.updBus(req.body.query, req.body.detailsToUpdate).then((resp) => {
        res.send("sucess !")
    })
})

router.post("/v1/api/adddbus", function (req, res) {
    busController.addBus(req.body).then((resp) => {
        res.send("sucess !")
    })
})

router.delete("/v1/api/delbus", function (req, res) {
    console.log(req.body)
    busController.deleteBus(req.body.employeeId).then((resp) => {
        res.send("sucess !")
    })
})


module.exports = router;