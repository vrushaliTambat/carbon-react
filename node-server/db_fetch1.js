var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, async (err, client) => {
    if (err) throw err;
    var dbo = client.db("mydb");
    let db = dbo.collection("employees")
    var males = await db.aggregate([
        { $match: { gender: "male" } },
        { $group: { _id: "$role", count: { $sum: 1 } } },
        // { $count: "no_of_male" }
    ]).toArray();
    var females = await db.aggregate([
        { $match: { gender: "female" } },
        { $group: { _id: "$role", count: { $sum: 1 } } },
    ]).toArray();

    let result = {};
    result.male = males;
    result.female = females;
    // const distRole = await db.distinct('role');
    // const distGender = await db.distinct('gender');
    // let result = {};
    // result.roles = distRole;
    // for (const gender of distGender) {
    //     result[gender] = {}
    //     for (const role of distRole) {
    //         result[gender][role] = await db.find({
    //             'gender': gender,
    //             'role': role
    //         }).count();
    //     }


    // console.log('RESULT MALE EMPLOYEES----------', males);
    // console.log('RESULT FEMALE EMPLOYEES----------', females);
    console.log('RESULT----------', result);
    client.close();
});