const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

MongoClient.connect(
    'mongodb://localhost:27017/',
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (connectErr, client) {
        assert.equal(null, connectErr);
        const coll = client.db('mydb').collection('employees');
        const result = await coll.updateMany({}, { $set: { gender: 'female' } })
        console.log(result);
        client.close();
    });