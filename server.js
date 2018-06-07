var express = require("express");
var app = express();
var mongojs = require("mongojs");
//var db = mongojs("customerslist", ["customers"]);
var db = mongojs("mongodb://localhost:27017/customerslist", ["customers"]);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/customerslistapp", function(req, res) {
    db.customerslist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post("/customerslistapp", function(req, res) {
    console.log(req.body);
    //only add a record when the first and last names are not empty
    if (req.body.name.first != "" && req.body.name.last != "") {
        db.customerslist.insert(req.body, function(err, doc) {
            res.json(doc);
        });
    }
});
app.delete("/customerslistapp/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.customerslist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});

app.get("/customerslistapp/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.customerslist.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});

app.put("/customerslistapp/:id", function(req, res) {
    var id = req.params.id;
    var lastContact = new Date();
    //only updating the record when the first and last names are not empty
    if (req.body.name.first != "" && req.body.name.last != "") {
        db.customerslist.findAndModify(
            {
                query: { _id: mongojs.ObjectId(id) },
                update: {
                    $set: {
                        name: {
                            first: req.body.name.first,
                            last: req.body.name.last
                        },
                        birthday: req.body.birthday,
                        gender: req.body.gender,
                        lastContact: lastContact,
                        customerLifetimeValue: req.body.customerLifetimeValue
                    }
                },
                new: true
            },
            function(err, doc) {
                res.json(doc);
            }
        );
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server running in the port 8080");
});
