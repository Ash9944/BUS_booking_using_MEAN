const express = require("express");
const router = express.Router();
const customerController = require("../services/customer");

router.get("/customers", function (req, res) {
    customerController.getAllUserDetails().then((resp) => {
        res.json({ data: resp })
    })
})

router.get("/customers/:id", (req, res) => {
    customerController.getuser(req.params.id).then((resp) => {
        res.json({ data: resp })
    })
})

router.post("/addcustomers", (req, res) => {
    customerController.addBooking(req.body).then((resp) => {
        res.send(resp)
    })
})

router.post("/insertcustomers", (req, res) => {
    console.log(req.body)
    customerController.addCustomer(req.body).then((resp) => {
        res.send("success")
    })
})

router.delete("/delcust", (req, res) => {
    console.log(req.body)
    customerController.deletecustomer(req.body.employeeId).then((resp) => {
        res.send("success !")
    })
})

router.post("/updcust", (req, res) => {
    customerController.updateCustomer(req.body).then((resp) => {
        res.send("success !")
    })
})

router.post("/findcust",(req,res) =>{
    customerController.getcustbyquery(req.body).then((resp)=>{
        res.send(resp)
    })
})

module.exports = router;