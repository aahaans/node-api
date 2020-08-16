// const url = "mongodb://localhost:27017/";
// const MongoClient = require('mongodb').MongoClient;

// module.exports = function (app, db) {
//     app.post('/notes', (req, res) => {
//         console.log("adding note")
//         MongoClient.connect(url, function (err, db) {
//             if (err) throw err;
//             var dbo = db.db("mydb");
//             // var myobj = { name: "Company Inc", address: "Highway 37" };
//             dbo.collection("notes").insertOne(req.body, function (err, res) {
//                 if (err) throw err;
//                 console.log("1 document inserted");
//                 db.close();
//             });
//         });
//         console.log("Added the object" + req.body + "to db")
//         res.send("Added the object \n" + req.body.title + "\n" + "with body" + req.body.title)
//     });
// };

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;

function postdb(app, db) {
    app.post('/notes', (req, res) => {
        console.log("adding note")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            // var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("notes").insertOne(req.body, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        console.log("Added the object" + req.body + "to db")
        res.send("Added the object \n" + req.body.title + "\n" + "with body" + req.body.title)
    });
};

function getdb(app, db) {
    app.get('/notes', (req, res) => {
        console.log("getting notes")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("customers").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    });
};

module.exports = postdb

// module.exports = getdb