const { query } = require("express");
const Bus = require("../daos/bus_db")


module.exports.getBusinroutes = (query)=>{
  return Bus.getByQuery(query)
}

module.exports.getAllUserDetails = function(){
  return Bus.getAll()
}

module.exports.updBus = function(id,detailstoupdate){
   return Bus.updateById(id,detailstoupdate)
}

module.exports.addBus = function(detailstoadd){
  return Bus.create(detailstoadd)
}