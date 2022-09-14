const Customer = require("../daos/customer_db");

module.exports.getAllUserDetails = function(){
  return Customer.getAll()
}

module.exports.getuser = (id)=>{
  return Customer.getById(id)
}