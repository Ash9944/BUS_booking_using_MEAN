const mongodb = require('mongodb');
const mongoclient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/BUS_APP'
var dbCache = {}
function connection() {
    console.log("Database connected !")
    const mong = mongoclient.connect(url)
    dbCache.db = mong
}

connection()

module.exports.getDb = function () {
    return dbCache.db;
}

module.exports.getMongodb = function () {
    return mongodb;
}

module.exports.ObjectID = mongodb.ObjectID;