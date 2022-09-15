const express = require("express");
const router = express.Router();
const customerController = require("../services/customer");

router.post("/v1/api/customers", customerController.addNewCustomer);

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



module.exports = router;
