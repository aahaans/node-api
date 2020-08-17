const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

function postdb(app, db) {
    app.post('/notes', (req, res) => {

        console.log(`This is the request ${req}`);

        console.log("adding note")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            // var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("notes").insertOne(req.body, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                res.send({ result });
                db.close();
            });
        });

        // res.send("Added the object \n" + req.body.title + "\n" + "with body" + req.body.title)
    });
};

function getdb(app, db) {
    app.get('/notes', (req, res) => {
        console.log("getting notes")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("notes").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result)
                db.close();
            });
        });
    });
};

function getnote(app, db) {
    app.get('/notes/:id', (req, res) => {
        console.log("getting note")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            const query = { _id: new ObjectId(req.params.id) }
            dbo.collection("notes").findOne(query, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result)
                db.close();
            });
        });
    });
};

function putnote(app, db) {
    app.put('/notes/:id', (req, res) => {
        console.log("editing note")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            const query = { _id: new ObjectId(req.params.id) }
            dbo.collection("customers").updateOne(query, req.body, function (err, result) {
                if (err) throw err;
                console.log("1 document updated");
                res.send("updated")
                db.close();
            });
        });
    });
};

function deletenote(app, db) {
    app.delete('/notes/:id', (req, res) => {
        console.log("deleting note")
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = { _id: new ObjectId(req.params.id) };
            dbo.collection("notes").deleteOne(query, function (err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
                res.send("deleted the document")
            });
        });
    });
};


module.exports = { postdb, getdb, getnote, putnote, deletenote }