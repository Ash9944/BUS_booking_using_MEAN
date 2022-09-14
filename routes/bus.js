const express = require("express");
const router = express.Router();
const busController = require("../services/bus");

router.get("/v1/api/bus", busController.getBus);
router.get("/v1/api/bus/:departure/:arrival", busController.getBusinroutes)
router.post("/v1/api/bus", (req, res) => {
    //console.log(req.body)
    busController.getbyquery(req.body).then((resp) => {
        res.send(resp)
        console.log(resp)
    })
})
module.exports = router;