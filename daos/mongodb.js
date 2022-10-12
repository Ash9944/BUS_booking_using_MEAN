const mongodb = require('mongodb');
const { ObjectID } = require('bson');
const url = 'mongodb://localhost:27017/BUS_APP';
const dbCache = {};

function connect() {
    var mong = mongodb.MongoClient.connect(url)
    dbCache.db = mong


}

function getDb() {
    return dbCache.db;
}

module.exports.connect = connect;
module.exports.getDb = getDb;
module.exports.ObjectID = ObjectID;