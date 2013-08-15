var mongo = require('mongodb')
  , Server = mongo.Server
  , server = new Server('ds039058.mongolab.com', 39058, {auto_reconnect : true})
  , db = new mongo.Db('isthatjustme', server);


var questions = [
    {
        "title": "or this site open source?",
        "slug": "or-is-this-site-open-source",
        "answer": "0",
        "creation_date": "2013-08-15"
    },
    {
        "title": "who use nodejs in production?",
        "slug": "who-use-nodejs-in-production",
        "answer": "1",
        "creation_date": "2013-08-15"
    }
];

db.collection('questions', function(err, collection) {
    collection.insert(questions[0], {safe:true}, function(err, result) {
        console.log(err, result)
    });
});
