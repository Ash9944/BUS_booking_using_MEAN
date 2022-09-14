const Customer = require("../daos/customer");

// will add customer if custmer with that email does not exist
exports.addNewCustomer = async (req, res) => {
  let email = req.body.email;
  let existingCustomer = await Customer.findOne({ email: email }).lean().exec();
  if (existingCustomer) {
    res.send(existingCustomer);
  } else {
    let newCustomer = await Customer.create(req.body);
    res.send(newCustomer);
  }
};

exports.getall = async (req, res) => {
  const getData = await Customer.find({});
  //console.log("get data:", getData);
  res.status(200).json({ data: getData });
}

exports.getOne = async (req, res) => {
  const getData = await Customer.findOne({ _id: req.params.id });
  //console.log("get data:", getData);
  res.status(200).json({ data: getData });
}

function filter() {

}