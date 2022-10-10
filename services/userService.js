const moment =  require('moment')
const userDao = require("../daos/userDao");


module.exports.getAllUserDetails = function () {
  return userDao.getAll()
}

module.exports.getuser = (id) => {
  return userDao.getById(id)
}

module.exports.addBooking = (query) => {
  var filter = {}
  filter.Bookings = query.query
  const m =  moment()
  filter.Bookings.time_of_booking = moment(filter.Bookings.time_of_booking).toDate()
  console.log(filter)
  return userDao.updateArrayById(query.id, filter)
}

module.exports.adduser = (info) => {
  info.Bookings = []
  return userDao.create(info)
}

module.exports.deleteuser = (id) => {
  return userDao.remove(id)
}

module.exports.updateuser = (query) => {
  console.log(query)
  return userDao.updateById(query.query, query.detailsToUpdate)
}

module.exports.getuserbyquery = (query) => {
  console.log(query)
  filter = {}
  if (query.gend) {
    filter.gender = query.gend
  }
  console.log(filter)
  return userDao.getByQuery(filter)
}