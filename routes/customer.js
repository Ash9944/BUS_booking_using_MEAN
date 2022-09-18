const express = require("express");
const router = express.Router();
const customerController = require("../services/customer");

//router.post("/v1/api/customers", customerController.addNewCustomer);

router.get("/v1/api/customers",function(req, res){
    customerController.getAllUserDetails().then((resp)=>{
        res.json({data:resp})
    })
})

router.get("/v1/api/customers/:id",(req,res)=>{
    customerController.getuser(req.params.id).then((resp)=>{
        res.json({data:resp})
    })
})

router.post("/v1/api/addcustomers",(req,res)=>{
    customerController.addBooking(req.body).then((resp)=>{
        res.send(resp)
    })
})


router.post("/v1/api/insertcustomers",(req,res)=>{
    console.log(req.body)
    customerController.addCustomer(req.body).then((resp)=>{
        res.send("success")
    })
})
router.delete("/v1/api/delcust",(req,res)=>{
    console.log(req.body)
    customerController.deletecustomer(req.body.employeeId).then((resp) => {
        res.send("sucess !")
    })
})

router.post("/v1/api/updcust",(req,res)=>{
    customerController.updateCustomer(req.body).then((resp) => {
        res.send("sucess !")
    })
})



module.exports = router;
