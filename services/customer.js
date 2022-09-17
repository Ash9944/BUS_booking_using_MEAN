const Customer = require("../daos/customer_db");

module.exports.getAllUserDetails = function(){
  return Customer.getAll()
}

module.exports.getuser = (id)=>{
  return Customer.getById(id)
}


module.exports.addBooking = (query)=>{
  var filter = {}
  filter.Bookings = query.query
  console.log(filter)
  return Customer.updateArrayById(query.id,filter)
}

module
