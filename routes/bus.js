const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.post("/v1/api/allbus", function (req, res) {
    busController.getAllUserDetails().then((resp) => {
        res.json({ data: resp })
    })
});
router.get("/v1/api/bus/:departure/:arrival", function (req, res) {
    busController.getBusinroutes({ arr_city: req.params.arrival, dep_city: req.params.departure }).then((resp) => {
        res.json(resp)
    })
})
<<<<<<< HEAD
router.post("/v1/api/bus",function(req, res){
    busController.getBusinroutes({arr_city:req.body.arr,dep_city:req.body.dept,type:req.body.type,cost:{$gt:parseInt(req.body.min), $lt:parseInt(req.body.max)}}).then((resp)=>{
=======
router.post("/v1/api/bus", function (req, res) {
    busController.getBusinroutes({ arr_city: req.body.arr, dep_city: req.body.dept, type: req.body.type, cost: { $gt: req.body.min, $lt: req.body.max } }).then((resp) => {
>>>>>>> 89baa3379fd22ba6333c11109f12fd15d9393ae6
        res.json(resp)
    }
    )
})

router.post("/v1/api/updbus", function (req, res) {
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