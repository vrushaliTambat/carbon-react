const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    const dbo = db.db("mydb");
    const _baseEmployees = [{
        "id": "14",
        "firstName": "Jeff",
        "lastName": "Firrelli",
        "email": "jeff@gmail.com",
        "role": "Software Developer"
    },
    {
        "id": "15",
        "firstName": "William",
        "lastName": "Bow",
        "email": "william@gmail.com",
        "role": "Team Lead"
    },
    {
        "id": "16",
        "firstName": "Taylor",
        "lastName": "Jennings",
        "email": "taylor345@gmail.com",
        "role": "Business Analyst"
    },
    {
        "id": "17",
        "firstName": "Anne",
        "lastName": "Rogers",
        "email": "Anne@gmail.com",
        "role": "Associate"
    },
    {
        "id": "18",
        "firstName": "Harvey",
        "lastName": "Doe",
        "email": "harvey@gmail.com",
        "role": "Software Developer"
    },
    {
        "id": "19",
        "firstName": "Ernst",
        "lastName": "Handel",
        "email": "ernst@gmail.com",
        "role": "Project Manager"
    },
    {
        "id": "20",
        "firstName": "Maison",
        "lastName": "Dewey",
        "email": "maisondewey34@gmail.com",
        "role": "Business Analyst"
    },
    {
        "id": "21",
        "firstName": "Adam",
        "lastName": "Waldorf",
        "email": "adamwal@gmail.com",
        "role": "Software Engineer"
    },];
    dbo.collection("employees").insertMany(_baseEmployees, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});