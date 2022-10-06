const Customer = require("../daos/customer_db");

module.exports.getAllUserDetails = function () {
  return Customer.getAll()
}

module.exports.getuser = (id) => {
  return Customer.getById(id)
}

module.exports.addBooking = (query) => {
  var filter = {}
  filter.Bookings = query.query
  console.log(filter)
  return Customer.updateArrayById(query.id, filter)
}

module.exports.addCustomer = (info) => {
  info.Bookings = []
  return Customer.create(info)
}

module.exports.deletecustomer = (id) => {
  return Customer.remove(id)
}

module.exports.updateCustomer = (query) => {
  console.log(query)
  return Customer.updateById(query.query, query.detailsToUpdate)
}

module.exports.getcustbyquery = (query) => {
  console.log(query)
  filter = {}
  if (query.gend) {
    filter.gender = query.gend
  }
  console.log(filter)
  return Customer.getByQuery(filter)
}