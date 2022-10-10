const Customer = require("../daos/userDao");
const moment =  require('moment')

module.exports.getAllUserDetails = function () {
  return Customer.getAll()
}

module.exports.getuser = (id) => {
  return Customer.getById(id)
}

module.exports.addBooking = (query) => {
  var filter = {}
  filter.Bookings = query.query
  const m =  moment()
  filter.Bookings.time_of_booking = moment(filter.Bookings.time_of_booking).toDate()
  console.log(filter)
  return Customer.updateArrayById(query.id, filter)
}

module.exports.adduser = (info) => {
  info.Bookings = []
  return Customer.create(info)
}

module.exports.deleteuser = (id) => {
  return Customer.remove(id)
}

module.exports.updateuser = (query) => {
  console.log(query)
  return Customer.updateById(query.query, query.detailsToUpdate)
}

module.exports.getuserbyquery = (query) => {
  console.log(query)
  filter = {}
  if (query.gend) {
    filter.gender = query.gend
  }
  console.log(filter)
  return Customer.getByQuery(filter)
}