var mongodb = require('./db_con');

module.exports.create =(record) =>{
     mongodb.getDb().then((res)=>{
        var db = res.db('BUS_APP')
        var coll = db.collection("customers");
        coll.insert(record)
    });
    
}

module.exports.createMany = (records) =>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.insertMany(records)
        })
        
    
    }

module.exports.getAll= ()=>{return new Promise((resolve,reject)=>{
    mongodb.getDb().then((res)=>{
        var db = res.db("BUS_APP")
        var coll = db.collection("customers");
        coll.find({}).toArray(function (err, result) {
        if (!err) {
            resolve( result);
        } else {
            reject(err);
        }

    });
    });
})}

module.exports.getById = (id) =>{
    return new Promise((resolve,reject)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.findOne({ _id: mongodb.ObjectID(id) }, function (err, result) {
                if (!err) {
                    resolve(result);
                } else {
                    resolve(err);
                }
        });
        
    });
    })
}

module.exports.getByQuery = (query,projection) =>{
    return new Promise((resolve,reject)=>{
        if (typeof projection == "function") {
            projection = null;
        }
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            var cursor;
            if (projection) {
                var projectionObj = {};
                projection.forEach(function (p) {
                    projectionObj[p] = 1;
                });
                cursor = coll.find(query, projectionObj);
            } else {
                cursor = coll.find(query);
            }
        
            cursor.toArray(function (err, result) {
                if (!err) {
                   resolve( result);
                } else {
                    reject(err);
                }
            });

        });
       
    })
}

module.exports.getAndSortByQuery = (query, projection, sortCriteria) =>{
    return new Promise((resolve,reject)=>{
    if (typeof projection == "function") {
        projection = null;
    }
    if (typeof sortCriteria == "function") {
        sortCriteria = null;
    }
    mongodb.getDb().then((res)=>{
        var db = res.db("BUS_APP")
        var coll = db.collection("customers");
        var cursor;
        if (projection) {
            var projectionObj = {};
            projection.forEach(function (p) {
            projectionObj[p] = 1;
        });
        cursor = coll.find(query, projectionObj);
     }
      else {
        cursor = coll.find(query);

    }

    if (sortCriteria) {
        cursor.sort(sortCriteria);
    }

    cursor.toArray(function (err, result) {
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    });
    });
    
}
)}

module.exports.update = (query, detailsToUpdate)=> {
    
         mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.updateOne(query,{ $set: detailsToUpdate })
        })
        
}

module.exports.upsert = (query, detailsToUpdate)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.update(query, { $set: detailsToUpdate }, { multi: false, upsert: true })
        });
        
    }


module.exports.updateToUnset = (query, detailsToUpdate)=> {
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.update(query, { $unset: detailsToUpdate }, { multi: false })
        });
        
    

}

module.exports.updateArrayById = (id, elementsToPush)=>{
    return new Promise((resolve,reject)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            resolve(coll.update({ _id: mongodb.ObjectID(id) }, { $push: elementsToPush }, { multi: false }))
        })
    })
        
        
    }


module.exports.updateArrayByQuery = (query, elementsToPush)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.update(query, { $push: elementsToPush }, { multi: false });
        })
        
    }

module.exports.removeItemInArrayByQuery = (query, elementToDelete)=>{
         mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.update(query, { $pull: elementToDelete }, { multi: false });
        })   
    }

module.exports.updateById = (id, detailsToUpdate) => {
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            var deletedId;
            if (detailsToUpdate._id) {
                deletedId = detailsToUpdate._id;
                delete detailsToUpdate._id;
            }

            coll.update({ _id: mongodb.ObjectID(id) }, { $set: detailsToUpdate }, { multi: false });
})}



module.exports.updateMany = (query, detailsToUpdate)=> {
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.updateMany(query, { $set: detailsToUpdate });
        })
        
    }
    



module.exports.distinctByQuery = (field, query)=>{
        if (typeof query == "function") {
            query = null;
        }
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            if(!query){
                query = {};
                coll.distinct(field, query)
            }
        })
        
    
}

module.exports.remove = (id)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.remove({ _id: mongodb.ObjectID(id) });
        })
        
    }


module.exports.removeByQuery = (query)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.remove(query);
        })
        
    }

module.exports.getIdFilter = (entity)=>{
    return {_id: mongodb.ObjectID(entity._id)};
}

module.exports.removeItemInArrayById = (id, elementToDelete)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.update({ _id: mongodb.ObjectID(id) }, { $pull: elementToDelete }, { multi: false });
        })
        
    }

module.exports.getMongoDb = ()=>{
    return mongodb;
}

module.exports.bulkWrite = (bulk)=>{
        mongodb.getDb().then((res)=>{
            var db = res.db("BUS_APP")
            var coll = db.collection("customers");
            coll.bulkWrite(bulk);
        })
        
    }

module.exports.getDb = ()=>{
    return monogdb.getDb().then((res)=>{
        return res
    });
}

