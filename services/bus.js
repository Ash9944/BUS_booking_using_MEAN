const Bus = require("../daos/bus")


module.exports.getBus = async (req, res) => {
    const getData = await Bus.find({});
    //console.log("get data:", getData);
    res.status(200).json({ data: getData });
  };

module.exports.getBusinroutes = exports.getBooking = async (req, res) => {
  // code here
  let { departure } = req.params;
  let { arrival } = req.params;
  const bookings = await Bus.find().lean().exec();
  let filteredBookings = bookings.filter(
    (booking) => booking.arr_city.toString() == arrival && booking.dep_city.toString() == departure
  );
  res.send(filteredBookings);
};