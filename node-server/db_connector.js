const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dbname = 'mydb';
const url = "mongodb://localhost:27017/mydb";

const state = {
    db: null
};

const connect = (callback) => {
    if (state.db) {
        callback();
    } else {
        MongoClient.connect(url, function (err, db) {
            if (err) callback(err);
            console.log("Database connected!");
            const dbo = db.db(dbname);
            state.db = dbo;
            callback();
        })
    }
}

const getPrimaryKey = (_id) => {
    return ObjectId(_id);
}

const getDB = () => {
    return state.db
};

module.exports = {
    getDB,
    connect,
    getPrimaryKey
};