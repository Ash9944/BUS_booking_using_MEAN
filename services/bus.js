const Bus = require("../daos/bus")
module.exports.getBus = async (req, res) => {
    const getData = await Bus.find({});
    //console.log("get data:", getData);
    res.status(200).json({ data: getData });
  };