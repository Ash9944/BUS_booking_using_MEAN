const { query } = require("express");
const Bus = require("../daos/bus_db")


module.exports.getBusinroutes = (query)=>{
  return Bus.getByQuery(query)
}

module.exports.getbyquery = async function (query) {
  queries = {}
  console.log(query)
  const bookings = await Bus.find().lean().exec();
  let filteredBookings = bookings.filter(
    (booking) => booking.arr_city.toString() == query.arr && booking.dep_city.toString() == query.dept && booking.type.toString() == query.type
  );
  for (let i = 0; i <= filteredBookings.length - 1; i++) {
    //console.log(filteredBookings[i].cost)
    if (parseInt(query.min) <= parseInt(filteredBookings[i].cost) && parseInt(filteredBookings[i].cost) <= parseInt(query.max)) {
      queries[i] = filteredBookings[i]
      //console.log()
    }
  }
  console.log(queries)
  return Promise.resolve(queries)
}

exports.addNewbus = async (req, res) => {
    let newCustomer = await Bus.create(req.body);
    res.send(newCustomer);
};