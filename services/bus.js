const { query } = require("express");
const Bus = require("../daos/bus")


module.exports.getBus = async (req, res) => {
    const getData = await Bus.find({});
    //console.log("get data:", getData);
    res.status(200).json({ data: getData });
  };

module.exports.getBusinroutes = async (req, res) => {
  // code here
  let { departure } = req.params;
  let { arrival } = req.params;
  const bookings = await Bus.find().lean().exec();
  let filteredBookings = bookings.filter(
    (booking) => booking.arr_city.toString() == arrival && booking.dep_city.toString() == departure
  );
  res.send(filteredBookings);
};
 

module.exports.getbyquery = async function(query){
  //queries = {}
  console.log(query)
  const bookings = await Bus.find().lean().exec();
  let filteredBookings = bookings.filter(
    (booking) => booking.arr_city.toString() == query.arr && booking.dep_city.toString() == query.dept && booking.type.toString() == query.type 
  );
  for(let i=0;i<=filteredBookings.length-1;i++){
    //console.log(filteredBookings[i].cost)
    if(query.min <= filteredBookings[i].cost && filteredBookings[i].cost <= query.max){
      return Promise.resolve(filteredBookings[i])
      //console.log()
    }
    else{
      return Promise.resolve("No data Found !")
    }
  }
}



// async function sample(a,b){
//   try{
//     if(!a || !b){
//       throw new Error("error");
//     }
//     else{
//       let x = await divide(a,b);
//       return Promise.resolve(x);
//     }
//   }
//   catch(e){
//     return Promise.reject(e);
//   }
// }

// function divide(a,b){
//   // return (a/b);
//   return new Promise((resolve,reject)=>{
//     resolve(a/b);
//   })
// }