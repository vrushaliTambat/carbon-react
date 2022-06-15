var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    const table = dbo.collection("employees");
    await table.createIndex({ firstName: "text", lastName: "text", email: "text", role: "text" })
    await table.find({ $text: { $search: "Williams" } }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
        db.close();
    });
});