var mongo = require('mongodb')
  , Server = mongo.Server
  , config = require('./config')
  , server = new Server(config.db.server, config.db.port, {auto_reconnect : true})
  , db = new mongo.Db(config.db.database, server)
  , utils = require('./utils')
  , date = new Date()
  , ntwitter = require('ntwitter')
  , twitter =  new ntwitter({consumer_key: config.twitter.consumer_key,
                             consumer_secret: config.twitter.consumer_secret,
                             access_token_key: config.twitter.access_token_key,
                             access_token_secret: config.twitter.access_token_secret,
                             });


function tweetQuestion(question) {
    var msg = "";
    msg += question.title.length > 116 ? question.title.substr(0, 115) + "…"
                                       : question.title;
    msg += "\n" + "http://isthatonly.me/"+question.slug;
    twitter.updateStatus(msg);
}


db.open(function(err, client) {
    client.authenticate(config.db.username, config.db.password, function(err, success) {
        db.collection('questions', {strict:true}, function(err, collection) {
            if (err) {
                console.error("The 'questions' collection doesn't exist.");
            }
        });
    });
});

exports.findAll = function(callback) {
    db.collection('questions', function(err, collection) {
        collection.find().sort({'creation_date': -1}).toArray(function(err, items) {
            callback(items);
        });
    });
};

exports.findBySlug = function(slug, callback) {
    db.collection('questions', function(err, collection) {
        collection.findOne({'slug': slug}, function(err, item) {
            callback(item);
        });
    });
}

exports.insert = function(question, callback) {
    function pad(n){return n<10 ? '0'+n : n}
    question.slug = utils.slugify(question.title);
    question.creation_date = date.getFullYear()+"-"+pad(date.getMonth())+"-"
                            +pad(date.getDate())+" "+pad(date.getHours())+":"
                            +pad(date.getMinutes())+":"+pad(date.getSeconds())
    db.collection('questions', function(err, collection) {
        collection.insert(question, {safe: true}, function(err) {
            callback(question, err);
            if(!err) {
                tweetQuestion(question);
            }
        });
    });
}
