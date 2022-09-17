const { query } = require("express");
const Bus = require("../daos/bus_db")


module.exports.getBusinroutes = (query)=>{
  var filter={}
  //console.log(query)
  var size = Object.keys(query).length;
  console.log(size)
  // finds only using type
  if(query.type && size==1){
    filter.type = query.type
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  // finds only using min cost
  if(query.min && size==1){
    filter.cost = {"$gt":parseInt(query.min)}
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  // finds only using max cost
  if(query.max && size==1){
    filter.cost = {"$lt":parseInt(query.max)}
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  // finds using arr_city and dep_city and min cost
  if(query.arr && query.dep && query.min && size == 3){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.cost = {"$gt":parseInt(query.min)}
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  //finds using arr_city and dep_city and max cost
  if(query.arr && query.dep && query.max && size == 3){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.cost = {"$lt":parseInt(query.max)}
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  if(query.arr && query.dep && query.max && query.type && size == 4){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.type = query.type
    filter.cost = {"$lt":parseInt(query.max)}
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  if(query.arr && query.dep && query.min && query.type && size == 4){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.type = query.type
    filter.cost = {"$gt":parseInt(query.min)}
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  //finds using arr_city and dep_city and min cost and max cost
  if(query.arr && query.dep && query.max && query.min && size == 4){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.cost = {'$gt':parseInt(query.min),'$lt':parseInt(query.max)}
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }
  //finds using arr_city and dep_city
  if(query.arr && query.dep && size == 2){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr  && size == 1){
    filter.arr_city = query.arr
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.dep && size == 1){
    filter.dep_city = query.dep
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.type && size == 2){
    filter.arr_city = query.arr
    filter.type = query.type
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.dep && query.type && size == 2){
    filter.dep_city = query.dep
    filter.type = query.type
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr_city && query.dep_city && size == 2){
    filter.arr_city = query.arr_city
    filter.dep_city = query.dep_city
    //console.log(filter)
    return Bus.getByQuery(filter)
    //console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.dep && query.type && size == 3){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.type = query.type
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.dep && query.type && query.min && query.max && size==5){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.type = query.type
    filter.cost = {'$gt':parseInt(query.min),'$lt':parseInt(query.max)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.type && query.min && query.max && size==4){
    filter.arr_city = query.arr
    filter.type = query.type
    filter.cost = {'$gt':parseInt(query.min),'$lt':parseInt(query.max)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.dep && query.type && query.min && query.max && size==5){
    filter.dep_city = query.dep
    filter.type = query.type
    filter.cost = {'$gt':parseInt(query.min),'$lt':parseInt(query.max)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.min  && size==2){
    filter.arr_city = query.arr
    filter.cost = {'$gt':parseInt(query.min)}
    console.log(filter,7)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.max && size==2){
    filter.arr_city = query.arr
    filter.cost = {'$lt':parseInt(query.max)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.dep && query.max && size==2){
    filter.dep_city = query.dep
    filter.cost = {'$lt':parseInt(query.max)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.dep && query.min && size==2){
    filter.arr_city = query.dep
    filter.cost = {'$gt':parseInt(query.min)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.dep && query.type && query.min && query.max && query.time && size==6){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.type = query.type
    filter.cost = {'$gt':parseInt(query.min),'$lt':parseInt(query.max)}
    filter.departureTime = {'$gt':new Date(query.time)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.arr && query.dep && query.time && size==3){
    filter.arr_city = query.arr
    filter.dep_city = query.dep
    filter.departureTime = {'$gt':query.time}
    console.log(filter)
    return Bus.getByQuery(filter)
  }

  if(query.time && size==1){
    filter.departureTime = {'$gt':new Date(query.time)}
    console.log(filter)
    return Bus.getByQuery(filter)
  }
  
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

module.exports.deleteBus = (id)=>{
  return Bus.remove(id)
}