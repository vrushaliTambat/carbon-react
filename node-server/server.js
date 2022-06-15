const app = require('express')();
const PORT = 8080;
const cors = require('cors');
const db_connector = require('./db_connector');
app.use(cors());

app.get('/tableData', (req, res) => {
    db_connector.getDB()
        .collection('employees')
        .find({}, { projection: { _id: 0 } })
        .toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
});

// app.get('/employees', async (req, res) => {
// try{
// let {page,size} = req.query;
// if(!page){
//     page=1;
// }
// if(!size){
//     size=5;
// }
// const limit=parseInt(size);
// const skip=(page-1)*size;
// const employees=await 
// }
// catch{

// }
// })

app.get('/chartData', async (req, res) => {
    const collc = db_connector.getDB().collection('employees');
    const distRoles = await collc.distinct('role');
    let dataSet1 = {};
    let dataSet2 = {};
    var males = await collc.aggregate([
        { $match: { gender: "male" } },
        { $group: { _id: "$role", count: { $sum: 1 } } },
        { $sort: { role: 1, _id: 1 } }
        // { $count: "no_of_male" }
    ]).toArray();
    var females = await collc.aggregate([
        { $match: { gender: "female" } },
        { $group: { _id: "$role", count: { $sum: 1 } } },
        { $sort: { role: 1, _id: 1 } }
    ]).toArray();

    let result = {};
    result.roles = distRoles;
    // result.male = males;
    // result.female = females;
    for (var i = 0; i < males.length; i++) {
        dataSet1[males[i]._id] = males[i].count;
    }
    for (var i = 0; i < females.length; i++) {
        dataSet2[females[i]._id] = females[i].count;
    }
    // const distRole = await collc.distinct('role');
    // const distGender = await collc.distinct('gender');
    // let result = {};
    // result.roles = distRole;
    // for (const gender of distGender) {
    //     result[gender] = {}
    //     for (const role of distRole) {
    //         result[gender][role] = await collc.find({
    //             'gender': gender,
    //             'role': role
    //         }).count();
    //     }
    //}
    //console.log('Dataset1', dataSet1);
    //console.log('Dataset2', dataSet2);
    result.male = dataSet1;
    result.female = dataSet2;
    //console.log('RESULT ----------', result);
    res.send(result);
});

app.get('/searchtable', async (req, res) => {
    console.log(req.query)
    const { search = '' } = req.query;
    if (search.length > 0) {
        console.log('Query string is', search);
        await db_connector.getDB()
            .collection('employees')
            .find({ $text: { $search: search } })
            .toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
            });
    } else {
        await db_connector.getDB()
            .collection('employees')
            .find({})
            .toArray((err, result) => {
                if (err) throw err;
                console.log(result);
                res.json(result);
            });
    }
})

app.get('/pagination', async (req, res) => {
    console.log("PAGINATION API", req.query);
    const { search = '', page, pageSize } = req.query;
    //making object
    const query = {};
    if (page < 0 || page === 0) {
        response = {
            "error": true,
            "message": "invalid page number, should start with 1"
        };
        return res.json(response)
    }
    query.skip = parseInt(pageSize * (page - 1));
    query.limit = parseInt(pageSize);
    let searchObj = {}, tableRecords;
    let _search = search.toLowerCase();
    if (search.length > 0) {
        searchObj = {
            "$or": [
                { "firstName": { $regex: _search, $options: "i" } },
                { "lastName": { $regex: _search, $options: "i" } },
                { "email": { $regex: _search, $options: "i" } },
                { "role": { $regex: _search, $options: "i" } }
            ]
        }
    }
    tableRecords = await db_connector.getDB()
        .collection('employees')
        .estimatedDocumentCount();
    await db_connector.getDB()
        .collection('employees')
        .find(searchObj, query)
        .toArray(function (err, result) {
            if (err) throw err;
            console.log('PAGINATION RESULT IS _______', result);
            res.json({
                tableData: result,
                pagination: {
                    totalRecords: search.length > 0 ? result.length : tableRecords
                }
            });
        });
})





db_connector.connect((err) => {
    if (err) {
        console.log('Unable to connect to database');
        process.exit(1);
    } else {
        app.listen(PORT, () => {
            console.log('******NODE SERVER IS UP ON PORT 8080********');
        });
    }
});


