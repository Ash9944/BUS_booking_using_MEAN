const { query } = require("express");
const Bus = require("../daos/bus_db")

module.exports.getBusinroutes = (query) => {

  let filter = {};
  
  if (query.arr){
    filter.arr_city = query.arr.toLowerCase();
  }
  if (query.dep){
    filter.dep_city = query.dep.toLowerCase();
  }
  if (query.min || query.max) {
    filter.cost = {};

    if (query.min)
      filter.cost['$gte'] = parseInt(query.min);

    if (query.max)
      filter.cost['$lte'] = parseInt(query.max);
  }

  if (query.type){
    filter.type = query.type;
  }
  if (query.time){
    filter.departureTime = { '$gte': query.time };
  }
  console.log(filter)
  return Bus.getByQuery(filter);
}

module.exports.getAllUserDetails = function () {
  return Bus.getAll()
}

module.exports.updBus = function (id, detailstoupdate) {
  return Bus.updateById(id, detailstoupdate)
}

module.exports.addBus = function (detailstoadd) {
  return Bus.create(detailstoadd)
}

module.exports.deleteBus = (id) => {
  return Bus.remove(id)
}