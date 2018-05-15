var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hrmnsngh:Mymongodb9@ds111370.mlab.com:11370/chirp-chat";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created");
    db.close();
});