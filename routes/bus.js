const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.post("/v1/api/allbus",function(req, res){
    busController.getAllUserDetails().then((resp)=>{
        res.json({data:resp})
    })});
router.get("/v1/api/bus/:departure/:arrival",function(req, res){
    busController.getBusinroutes({arr_city:req.params.arrival,dep_city:req.params.departure}).then((resp)=>{
        res.json(resp)
    })
})
router.post("/v1/api/bus",function(req, res){
    busController.getBusinroutes({arr_city:req.body.arr,dep_city:req.body.dept,type:req.body.type,cost:{$gt:req.body.min , $lt:req.body.max }}).then((resp)=>{
        res.json(resp)
    }
 )})

 router.post("/v1/api/updbus",function(req, res){
    busController.updBus(req.body.query,req.body.detailsToUpdate).then((resp)=>{
        res.send("sucess !")
    })
})

router.post("/v1/api/adddbus",function(req, res){
    console.log()
    busController.addBus(req.body).then((resp)=>{
        res.send("sucess !")
    })
})


module.exports = router;