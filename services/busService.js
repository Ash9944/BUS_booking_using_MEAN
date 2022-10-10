const moment = require("moment/moment");
const busDao = require("../daos/busDao")


module.exports.busFilterQuery = (query) => {

  let filter = {};
  console.log(query)

  if (query.arr) {
    filter.arr_city = query.arr.toLowerCase();
  }
  if (query.dep) {
    filter.dep_city = query.dep.toLowerCase();
  }
  if (query.min || query.max) {
    filter.cost = {};

    if (query.min)
      filter.cost['$gte'] = parseInt(query.min);

    if (query.max)
      filter.cost['$lte'] = parseInt(query.max);
  }

  if (query.type) {
    filter.type = query.type;
  }

  if (query.time) {
    filter.departureTime = { '$gte': new Date(query.time), '$lte': new Date(addtime) };
  }

  if (query.frontendtime) {
    filter.departureTime = { '$gte': new Date(query.frontendtime), '$lte': new Date(add_time) };
  }

  console.log(filter)
  return busDao.getByQuery(filter);
}

module.exports.getAllBusDetails = function () {
  return busDao.getAll()
}

module.exports.updBus = function (id, detailstoupdate) {

  detailstoupdate.arrivalTime = moment( detailstoupdate.arrivalTime).toDate()
  detailstoupdate.departureTime = moment( detailstoupdate.departureTime).toDate()
  console.log(detailstoupdate)
  return busDao.updateById(id, detailstoupdate)
}

module.exports.addBus = function (detailstoadd) {
  detailstoadd.arrivalTime = moment(detailstoadd.arrivalTime).toDate()
  detailstoadd.departureTime = moment(detailstoadd.departureTime).toDate()
  console.log(detailstoadd)
  return busDao.create(detailstoadd)
}

module.exports.deleteBus = (id) => {
  return busDao.remove(id)
}