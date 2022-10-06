const { query } = require("express");
const BusService = require("../daos/busDao")

module.exports.busFilterQuery = (query) => {

  let filter = {};

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
    filter.departureTime = { '$gte': query.time };
  }
  console.log(filter)
  return BusService.getByQuery(filter);
}

module.exports.getAllBusDetails = function () {
  return BusService.getAll()
}

module.exports.updBus = function (id, detailstoupdate) {
  return BusService.updateById(id, detailstoupdate)
}

module.exports.addBus = function (detailstoadd) {
  return BusService.create(detailstoadd)
}

module.exports.deleteBus = (id) => {
  return BusService.remove(id)
}